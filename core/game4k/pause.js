// const
Game4kids.Game.KEY_CAPTURES = [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.DELETE, Phaser.Keyboard.ENTER,
    Phaser.Keyboard.PAGE_UP, Phaser.Keyboard.PAGE_DOWN, Phaser.Keyboard.HOME, Phaser.Keyboard.END];

// properties
Game4kids.Game.prototype.pause = null;

// constructor
Game4kids.Game.prototype.initPause = function () {
    this.pause = false;
    this.input.keyboard.addKeyCapture(this.KEY_CAPTURES);
}

// methods
Game4kids.Game.prototype.pause = function () {
    this.paused = true;

    for (var i in Game4kids.Game.KEY_CAPTURES) {
        this.input.keyboard.removeKeyCapture(Game4kids.Game.KEY_CAPTURES[i]);
    }
}

Game4kids.Game.prototype.resume = function () {
    this.paused = false;
    this.input.keyboard.addKeyCapture(Game4kids.Game.KEY_CAPTURES);
}

// static methods
Game4kids.Game.pauseCurrentGame = function () {
    Game4kids.currentGame.pause();
}

Game4kids.Game.resumeCurrentGame = function () {
    Game4kids.currentGame.resume();
}

Game4kids.Game.destroyCurrentGame = function () {
    Game4kids.currentGame.destroy();
    Game4kids.currentGame = null;
}