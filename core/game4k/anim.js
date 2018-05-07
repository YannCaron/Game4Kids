// Global
Game4kids.LOCK_NAME = 'lock'
Game4kids.Game.prototype.currentLocked = null;
Game4kids.Game.prototype.anims = null;

Game4kids.Game.prototype.initAnim = function () {
    this.currentLocked = null;
}

Game4kids.Game.prototype.resume = function () {
    if (this.currentLocked) {
        this.currentLocked.childCompleted(Game4kids.LOCK_NAME);
        this.currentLocked = null;
    }
}

// Tween
// Tween.constructor
Game4kids.Tween = function (target, game, manager, parent = null) {
    Phaser.Tween.call(this, target, game, manager);
    this.parent_ = parent;
    this.target_ = target;
    this.provider_ = {};

    if (this.parent_ && this.parent_.register) {
        this.parent_.register(this);
    }

    var self = this;
    this.onComplete.add(function () {
        if (self.parent_ && self.parent_.childCompleted) {
            self.parent_.childCompleted(self);
        }
    });
};

Game4kids.Tween.prototype = Object.create(Phaser.Tween.prototype);
Game4kids.Tween.prototype.constructor = Game4kids.Tween;

// Tween.methods
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
    if (this.target_.alive) {
        this.to(this.provider_, time * 1000);
        this.provider_ = {};
    } else {
        this.destroy();
    }
    return this;
}

Game4kids.Tween.prototype.destroy = function () {
    if (this.parent_ != null && this.parent_.destroy) {
        this.parent_.destroy();
    }
    return this;
}

// Tween.events
Game4kids.Tween.prototype.onCompleted = function (callback) {
    this.onComplete.add(callback);
}

// TweenLock
// TweenLock.constructor
Game4kids.TweenLock = function (game, parent = null) {
    this.game_ = game;
    this.parent_ = parent;

    if (this.parent_ && this.parent_.register) {
        this.parent_.register(Game4kids.LOCK_NAME);
        game.currentLocked = this.parent_;
    }
}

// TweenLock.method
Game4kids.TweenLock.prototype.start = function () {
}

// TweenLock.events
Game4kids.TweenLock.prototype.onCompleted = function (callback) {
    this.callback_ = callback;
    return this;
}

// TweenExecutor
// TweenExecutor.constructor
Game4kids.TweenExecutor = function (command, parent = null) {
    this.command_ = command.bind(this);
    this.callback_ = null;
    this.parent_ = parent;
    this.children_ = new Map();

    if (this.parent_ && this.parent_.register) {
        this.parent_.register(this);
    }
}

// TweenExecutor.methods
Game4kids.TweenExecutor.prototype.register = function (object) {
    this.children_.set(object, false);
}

Game4kids.TweenExecutor.prototype.childCompleted = function (object) {
    this.children_.set(object, true);

    var all = true;
    this.children_.forEach(value => { if (!value) { all = false } });
    if (all) {
        this.fireCompleted_();
    }
}

Game4kids.TweenExecutor.prototype.start = function () {
    this.command_();

    if (this.children_.size == 0) {
        this.fireCompleted_();
    }
    return this;
}

Game4kids.TweenExecutor.prototype.destroy = function () {
    if (this.parent_ != null && this.parent_.destroy) {
        this.parent_.destroy();
    }
    return this;
}

// TweenExecutor.events
Game4kids.TweenExecutor.prototype.onCompleted = function (callback) {
    this.callback_ = callback;
    return this;
}

// TweenExecutor.private
Game4kids.TweenExecutor.prototype.fireCompleted_ = function () {
    if (this.callback_) {
        this.callback_();
    }
    if (this.parent_ && this.parent_.childCompleted) {
        this.parent_.childCompleted(this);
    }
}

Game4kids.TweenExecutor.prototype.destroy = function () {
    if (this.parent_ != null && this.parent_.destroy) {
        this.parent_.destroy();
    } else {
        this.destroy_ = true;
    }
    return this;
}

// Sequence
// Sequence.constructor
Game4kids.Sequence = function (parent = null) {
    this.parent_ = parent;

    this.factories_ = new Array();
    this.destroy_ = false;
    this.repeat_ = 0;
    this.currentRepeat_ = 0;

    if (this.parent_ && this.parent_.register) {
        this.parent_.register(this);
    }
};

// Sequence.methods
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

Game4kids.Sequence.prototype.destroy = function () {
    if (this.parent_ != null && this.parent_.destroy) {
        this.parent_.destroy();
    } else {
        this.destroy_ = true;
    }
    return this;
}

// Sequence.events
Game4kids.Sequence.prototype.onCompleted = function (callback) {
    this.callback_ = callback;
    return this;
}

// Sequence.private
Game4kids.Sequence.prototype.playNext_ = function (index) {
    if (this.destroy_) return;

    if (index == 0 && typeof this.repeat_ === 'function' && !this.repeat_()) { this.fireCompleted_(); return; };
    if (index >= this.factories_.length) {
        if (typeof this.repeat_ === 'function') {
            if (this.repeat_()) index = 0;
            else { this.fireCompleted_(); return; };
        } else if (this.repeat_ == -1) index = 0;
        else if (this.repeat_ > this.currentRepeat_) { index = 0; this.currentRepeat_++; }
        else { this.fireCompleted_(); return; }
    }

    var self = this;
    var tween = this.factories_[index]();
    tween.onCompleted(function () {
        self.playNext_(index + 1);
    });
    tween.start();
    return this;
};

Game4kids.Sequence.prototype.fireCompleted_ = function () {
    if (this.callback_) {
        this.callback_();
    }
    if (this.parent_ && this.parent_.childCompleted) {
        this.parent_.childCompleted(this);
    }
}