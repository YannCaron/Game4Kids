/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// Global
Game4kids.Game.prototype.currentLock = null;
Game4kids.Game.prototype.anims = null;

Game4kids.Game.prototype.initAnim = function () {
    this.currentLock = null;
    this.anims = new Set();
}

Game4kids.Game.prototype.pauseTween = function (parent = null) {
    this.resumeTween();

    this.currentLock = new Game4kids.TweenLock(parent);
    this.currentLock.lock();
}

Game4kids.Game.prototype.resumeTween = function () {
    if (this.currentLock) {
        this.currentLock.unlock();
        this.currentLock = null;
    }
}

Game4kids.Game.prototype.clearAnims = function () {
    this.anims.forEach(sequence => sequence.destroy());
    this.anims.clear();
}

// TweenLock
// TweenLock.constructor
Game4kids.TweenLock = function (parent = null) {
    this.parent_ = parent;
    this.callback_ = null;
}

// TweenLock.method
Game4kids.TweenLock.prototype.lock = function () {
    if (this.parent_ && this.parent_.lockChild) {
        this.parent_.lockChild(this);
    }
}

Game4kids.TweenLock.prototype.unlock = function () {
    if (this.parent_ && this.parent_.unlockChild) {
        this.parent_.unlockChild(this);
    }

    if (this.callback_) {
        this.callback_();
    }
}

// TweenLock.events
Game4kids.TweenLock.prototype.onCompleted = function (callback) {
    this.callback_ = callback;
    return this;
}

// TweenLockNode
// TweenLockNode.constructor
Game4kids.TweenLockNode = function(parent = null) {
    Game4kids.TweenLock.call(this, parent);
    this.children_ = new Map();
}

Game4kids.TweenLockNode.prototype = Object.create(Game4kids.TweenLock.prototype);
Game4kids.TweenLockNode.prototype.constructor = Game4kids.TweenLockNode;

// TweenLockNode.method
Game4kids.TweenLockNode.prototype.lockChild = function (object) {
    this.children_.set(object, false);
}

Game4kids.TweenLockNode.prototype.unlockChild = function (object) {
    this.children_.set(object, true);
    this.checkChildren();
}

Game4kids.TweenLockNode.prototype.checkChildren = function (object) {
    var allUnlocked = true;
    this.children_.forEach(value => { if (!value) { allUnlocked = false } });
    if (allUnlocked) {
        this.unlock();
    }
}

// Tween
// Tween.constructor
Game4kids.Tween = function (target, game, manager, parent = null) {
    Phaser.Tween.call(this, target, game, manager);
    this.parent_ = parent;
    this.target_ = target;
    this.provider_ = {};
    this.lock_ = new Game4kids.TweenLock(parent);

    var self = this;
    this.onComplete.add(function () {
        self.lock_.unlock();
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
        get: function () {
            try {
                this.lastDoTargetValue = getter();
                return this.lastDoTargetValue;
            } catch (ex) {
                return this.lastDoTargetValue == undefined ? 0 : this.lastDoTargetValue;
            }
        },
        enumerable: true
    });
    return this;
}

Game4kids.Tween.prototype.apply = function (applier, reset) {
    this.onUpdateCallback(applier);
    this.onComplete.add(reset);

    return this;
}

Game4kids.Tween.prototype.animate = function (time) {
    this.lock_.lock();

    if (this.target_.alive == undefined || this.target_.alive) {
        this.to(this.provider_, time * 1000);
        this.provider_ = {};
    } else {
        console.log('HERE');
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

// TweenExecutor
// TweenExecutor.constructor
Game4kids.TweenExecutor = function (command, parent = null) {
    Game4kids.TweenLockNode.call(this, parent);

    this.command_ = command.bind(this);
    this.callback_ = null;
    this.children_ = new Map();
}

Game4kids.TweenExecutor.prototype = Object.create(Game4kids.TweenLockNode.prototype);
Game4kids.TweenExecutor.prototype.constructor = Game4kids.TweenExecutor;

// TweenExecutor.methods
Game4kids.TweenExecutor.prototype.start = function () {
    this.lock();
    this.command_();

    if (this.children_.size == 0) {
        this.checkChildren();
    }
    return this;
}

Game4kids.TweenExecutor.prototype.destroy = function () {
    if (this.parent_ != null && this.parent_.destroy) {
        this.parent_.destroy();
    }
    return this;
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
    Game4kids.TweenLock.call(this, parent);

    this.factories_ = new Array();
    this.destroy_ = false;
    this.repeat_ = 0;
    this.currentRepeat_ = 0;

    if (!(this.parent_ && this.parent_.lockChild)) {
        Game4kids.current.anims.add(this);
    }
};

Game4kids.Sequence.prototype = Object.create(Game4kids.TweenLock.prototype);
Game4kids.Sequence.prototype.constructor = Game4kids.Sequence;


// Sequence.methods
Game4kids.Sequence.prototype.addFactory = function (factory) {
    this.factories_.push(factory.bind(this));
    return this;
};

Game4kids.Sequence.prototype.start = function () {
    this.lock();
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
        Game4kids.current.anims.delete(this);
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
    this.unlock();
}