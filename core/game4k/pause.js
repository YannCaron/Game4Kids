/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// const
Game4kids.Game.KEY_CAPTURES = [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP,
    Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.DELETE, Phaser.Keyboard.ENTER,
    Phaser.Keyboard.PAGE_UP, Phaser.Keyboard.PAGE_DOWN, Phaser.Keyboard.HOME, Phaser.Keyboard.END];

// constructor
Game4kids.Game.prototype.initPause = function () {
    this.input.keyboard.addKeyCapture(Game4kids.Game.KEY_CAPTURES);
    this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
}

// methods
Game4kids.Game.prototype.pause = function () {
    this.game.paused = true;

    for (var i in Game4kids.Game.KEY_CAPTURES) {
        this.input.keyboard.removeKeyCapture(Game4kids.Game.KEY_CAPTURES[i]);
    }

    this.game.canvas.oncontextmenu = null;
}

Game4kids.Game.prototype.resume = function () {
    this.game.paused = false;
    this.input.keyboard.addKeyCapture(Game4kids.Game.KEY_CAPTURES);
    this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
}

// static methods
Game4kids.Game.pause = function () {
    if (Game4kids.current == null) return;
    Game4kids.current.pause();
}

Game4kids.Game.resume = function () {
    if (Game4kids.current == null) return;
    Game4kids.current.resume();
}

Game4kids.Game.destroy = function () {
    if (Game4kids.current == null) return;
    Game4kids.current.game.destroy();
    Game4kids.current = null;
}