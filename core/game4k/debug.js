/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// inner class
Game4kids.Game.VariableInfo = function (name, callback) {
    this.name = name;
    this.callback = callback;
}

// attributes
Game4kids.Game.DEBUG_FONT_SIZE = 17;
Game4kids.Game.DEBUG_COLOR = 'white';
Game4kids.Game.DEBUG_FONT = `${Game4kids.Game.DEBUG_FONT_SIZE}px Courier`;

Game4kids.Game.MAX_LOG = 20;
Game4kids.Game.LOG_X = 10;
Game4kids.Game.LOG_Y = 20;
Game4kids.Game.LINE_H = Game4kids.Game.DEBUG_FONT_SIZE + 1;

Game4kids.Game.prototype.debugMode = null;
Game4kids.Game.prototype.logger = null;
Game4kids.Game.prototype.infos = null;

Game4kids.Game.prototype.initDebug = function () {
    this.debugMode = false;
    this.logger = [];
    this.infos = [];

    this.game.debug.font = Game4kids.Game.DEBUG_FONT;

    // capture console.log
    var oldLog = console.log;
    var game4k = this;
    console.log = function (msg) {
        if (game4k.debugMode) {
            game4k.log(msg);
        }
        oldLog.apply(console, arguments);
    };
}

Game4kids.Game.prototype.setDebugMode = function (mode) {
    this.time.advancedTiming = mode;
    this.debugMode = mode;
}

Game4kids.Game.prototype.renderDebug = function () {
    if (this.debugMode) {

        // debug physic
        for (var g in this.groups.groups) {
            this.groups.groups[g].forEachAlive(this.game.debug.body, this.game.debug);
        }

        // logger
        this.game.debug.start(this.game.width / 2, Game4kids.Game.LOG_Y);
        for (var i in this.logger) {
            this.game.debug.line(this.logger[i]);
        }
        this.game.debug.stop();

        // log infos
        this.logInfo();
    }
}

// methods
Game4kids.Game.prototype.log = function (msg) {
    this.logger.push(msg);
    while (this.logger.length > Game4kids.Game.MAX_LOG) {
        this.logger.shift();
    }
}

Game4kids.Game.prototype.addInfo = function (name, callback) {
    this.infos.push(new Game4kids.Game.VariableInfo(name, callback));
}

Game4kids.Game.prototype.logInfo = function () {
    var y = Game4kids.Game.LOG_Y;

    this.game.debug.text('Living actors: ' + this.actorCount + ' / ' + this.maxActor, Game4kids.Game.LOG_X, y, Game4kids.Game.DEBUG_COLOR, Game4kids.Game.DEBUG_FONT);
    y += Game4kids.Game.LINE_H;
    this.game.debug.text('Active event: ' + this.signals.length, Game4kids.Game.LOG_X, y, Game4kids.Game.DEBUG_COLOR, Game4kids.Game.DEBUG_FONT);
    y += Game4kids.Game.LINE_H;
    this.game.debug.text('Frame rate: ' + this.time.fps || '--', Game4kids.Game.LOG_X, y, Game4kids.Game.DEBUG_COLOR, Game4kids.Game.DEBUG_FONT);
    y += Game4kids.Game.LINE_H;

    for (var i in this.infos) {
        var info = this.infos[i];
        var result = info.callback();

        if (result != undefined) {
            if (result.type == Phaser.SPRITE) {
                this.game.debug.text(info.name + ': ', Game4kids.Game.LOG_X, y, Game4kids.Game.DEBUG_COLOR, Game4kids.Game.DEBUG_FONT);
                y += Game4kids.Game.LINE_H;
                this.game.debug.spriteInfo(result, Game4kids.Game.LOG_X * 2, y);
                y += Game4kids.Game.LINE_H * 5;
            } else {
                this.game.debug.text(info.name + ': ' + result, Game4kids.Game.LOG_X, y, Game4kids.Game.DEBUG_COLOR, Game4kids.Game.DEBUG_FONT);
                y += Game4kids.Game.LINE_H;
            }
        }

    }
}

