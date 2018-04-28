// Tween
// constructor
Game4kids.Tween = function (target, game, manager) {
    Phaser.Tween.call(this, target, game, manager);
    this._provider = {};
};

Game4kids.Tween.prototype = Object.create(Phaser.Tween.prototype);
Game4kids.Tween.prototype.constructor = Game4kids.Tween;

// methods
Game4kids.Tween.prototype.do = function (property, value) {
    this._provider[property] = value;
    return this;
}

Game4kids.Tween.prototype.doRelative = function (property, value) {
    this._provider[property] = value.toString();
    return this;
}

Game4kids.Tween.prototype.doTarget = function (property, getter) {
    Object.defineProperty(this._provider, property, {
        get: function () { return getter(); },
        enumerable: true
    });
    return this;
}

Game4kids.Tween.prototype.animate = function (time) {
    this.to(this._provider, time * 1000);
    this._provider = {};
    return this;
}

// events
Game4kids.Tween.prototype.onCompleted = function (callback) {
    this.onComplete.add(callback);
}

// Code
Game4kids.TweenExecutor = function (command) {
    this._command = command;
    this._callback = null;
    this._started = false;
}

Game4kids.TweenExecutor.prototype.onCompleted = function (callback) {
    this._callback = callback;

    if (this._started) {
        this._callback();
    }

    return this;
}

Game4kids.TweenExecutor.prototype.start = function () {
    this._started = true;

    this._command();

    if (this._callback) {
        this._callback();
    }
    return this;
}

// class
Game4kids.Sequence = function (target) {
    this.target = target;

    this.factories_ = new Array();
    this.repeat_ = 0;
    this.currentRepeat_ = 0;
};

Game4kids.Sequence.prototype.addFactory = function (factory) {
    this.factories_.push(factory);
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
    this._callback = callback;
    return this;
}

Game4kids.Sequence.prototype.playNext_ = function (index) {
    if (!this.target.alive) return;

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
    return this;
};

Game4kids.Sequence.prototype.fireCompleted = function () {
    if (this._callback) {
        this._callback();
    }
}