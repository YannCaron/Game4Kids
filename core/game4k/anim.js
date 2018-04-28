// Tween
// constructor
Game4kids.Tween = function (target, game, manager, parent = null) {
    Phaser.Tween.call(this, target, game, manager);
    this.parent_ = parent;
    this.provider_ = {};

    if (this.parent_ && this.parent_.register) {
        this.parent_.register(this);
    }

    var self = this;
    this.onComplete.add(function () {
        if (self.parent_ && self.parent_.childCompleted) {
            self.parent_.childCompleted(this);
        }
    });
};

Game4kids.Tween.prototype = Object.create(Phaser.Tween.prototype);
Game4kids.Tween.prototype.constructor = Game4kids.Tween;

// methods
Game4kids.Tween.prototype.do = function (property, value) {
    this.provider_[property] = value;
    return this;
}

Game4kids.Tween.prototype.doRelative = function (property, value) {
    this.provider_[property] = value.toString();
    return this;
}

Game4kids.Tween.prototype.doTarget = function (property, getter) {
    Object.defineProperty(this.provider_, property, {
        get: function () { return getter(); },
        enumerable: true
    });
    return this;
}

Game4kids.Tween.prototype.animate = function (time) {
    this.to(this.provider_, time * 1000);
    this.provider_ = {};
    return this;
}

// events
Game4kids.Tween.prototype.onCompleted = function (callback) {
    this.onComplete.add(callback);
}

// Code
Game4kids.TweenExecutor = function (command, parent = null) {
    this.command_ = command;
    this.callback_ = null;
    this.parent_ = parent;
    this.children_ = new Map();
}

Game4kids.TweenExecutor.prototype.register = function (object) {
    this.children_.set(object, false);
}

Game4kids.TweenExecutor.prototype.childCompleted = function (object) {
    this.children_.set(object, true);

    if (this.callback_) {
        var all = true;
        this.children_.forEach(value => { if (!value) { all = false } });
        if (all) {
            this.callback_();
        }
    }
}

Game4kids.TweenExecutor.prototype.onCompleted = function (callback) {
    this.callback_ = callback;
    return this;
}

Game4kids.TweenExecutor.prototype.start = function () {
    this.command_();

    if (this.callback_ && this.children_.length == 0) {
        this.callback_();
    }
    return this;
}

// class
Game4kids.Sequence = function (target, parent = null) {
    this.target_ = target;
    this.parent_ = parent;

    this.factories_ = new Array();
    this.repeat_ = 0;
    this.currentRepeat_ = 0;

    if (this.parent_ && this.parent_.register) {
        this.parent_.register(this);
    }
};

Game4kids.Sequence.prototype.addFactory = function (factory) {
    this.factories_.push(factory.bind(this));
    return this;
};

Game4kids.Sequence.prototype.start = function () {
    this.playNext_(0);
    return this;
};

Game4kids.Sequence.prototype.repeat = function (repeat) {
    this.repeat_ = repeat;
    this.currentRepeat_ = 0;
    return this;
}

Game4kids.Sequence.prototype.onCompleted = function (callback) {
    this.callback_ = callback;
    return this;
}

Game4kids.Sequence.prototype.playNext_ = function (index) {
    if (!this.target_.alive) return;

    if (index >= this.factories_.length) {
        if (this.repeat_ == -1) index = 0;
        else if (this.repeat_ > this.currentRepeat_) { index = 0; this.currentRepeat_++; }
        else { this.fireCompleted(); return; }
    }

    var self = this;
    var tween = this.factories_[index]();
    tween.onCompleted(function () {
        self.playNext_(index + 1);
    });
    tween.start();
    return this;
};

Game4kids.Sequence.prototype.fireCompleted = function () {
    if (this.callback_) {
        this.callback_();
    }
    if (this.parent_ && this.parent_.childCompleted) {
        this.parent_.childCompleted(this);
    }
}