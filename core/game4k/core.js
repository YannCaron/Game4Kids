// namespace
var Game4kids = Game4kids || {
    currentGame : null,
};

// constructor
Game4kids.Game = function (width, height, content, state) {
    new Phaser.Game(width, height, Phaser.AUTO, content, this);
    this._state = state;
}

// state methods
Game4kids.Game.prototype.preload = function () {
    Game4kids.currentGame = this.game;

    this.initGame();
    this.initDebug();
    this.initPause();
    this.initEvent();
        
    // call state.preload
    if (this._state && this._state.preload) this._state.preload(this.game);
};

Game4kids.Game.prototype.create = function () {
    // call state.create
    if (this._state && this._state.create) this._state.create(this.game);
}

Game4kids.Game.prototype.update = function () {
    this.updateEvent();

    // call state.update
    if (this._state && this._state.update) this._state.update(this.game);
}

Game4kids.Game.prototype.render = function () {
    this.renderDebug();

    // call state.render
    if (this._state && this._state.render) this._state.render(this.game);
}
