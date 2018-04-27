// add methods for composite purpose
Phaser.Tween.prototype.onCompleted = function (callback) {
    this.onComplete.add(callback);
}

// namespace
Game4kids.Anim = Game4kids.Anim || {
};

// class
Game4kids.Anim.Sequence = function (target) {
    this.target = target;

    this.factories_ = new Array();
    this.repeat_ = 0;
    this.currentRepeat_ = 0;
};

Game4kids.Anim.Sequence.prototype.addFactory = function (factory) {
    this.factories_.push(factory);
    return this;
};

Game4kids.Anim.Sequence.prototype.start = function () {
    this.playNext_(0);
    return this;
};

Game4kids.Anim.Sequence.prototype.repeat = function (repeat) {
    this.repeat_ = repeat;
    this.currentRepeat_ = 0;
    return this;
}

Game4kids.Anim.Sequence.prototype.onCompleted = function (callback) {
    this.callback_ = callback;
    return this;
}

Game4kids.Anim.Sequence.prototype.playNext_ = function (index) {
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
    tween.start();
    return this;
};

Game4kids.Anim.Sequence.prototype.fireCompleted = function () {
    if (this.callback_) {
        this.callback_();
    }
}