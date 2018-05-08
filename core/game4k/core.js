// namespace
var Game4kids = Game4kids || {
    current: null,
};

// constructor
Game4kids.Game = function (width, height, content, state) {
    new Phaser.Game(width, height, Phaser.AUTO, content, this);
    this._state = state;
}

// state methods
Game4kids.Game.prototype.preload = function () {
    Game4kids.current = this;

    try {
        this.initGame();
        this.initDebug();
        this.initPause();
        this.initEvent();
        this.initAnim();

        // call state.preload
        if (this._state && this._state.preload) this._state.preload();
    } catch (err) {
        this.manageError(err);
    }

};

Game4kids.Game.prototype.create = function () {
    // call state.create
    try {
        if (this._state && this._state.create) this._state.create();
    } catch (err) {
        this.manageError(err);
    }
}

Game4kids.Game.prototype.update = function () {
    try {
        this.updateGame();
        this.updateEvent();

        // call state.update
        if (this._state && this._state.update) this._state.update();
    } catch (err) {
        this.manageError(err);
    }
}

Game4kids.Game.prototype.render = function () {
    try {
        this.renderDebug();

        // call state.render
        if (this._state && this._state.render) this._state.render();
    } catch (err) {
        this.manageError(err);
    }

}

// method
Game4kids.Game.prototype.manageError = function (err) {
    alert(`A ${err.name} occured !\n${err.message}\nSource Line: ${err.lineNumber}`);
    try {
        Code.manageError(err);
    } catch (e) {}
    throw err;
}