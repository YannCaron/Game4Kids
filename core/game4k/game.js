/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// const
Game4kids.Game.DEFAULT_MAX_ACTOR = 500;
Game4kids.Game.TEXT_FONT = "Courier New"; // another choice: DejaVu Sans Mono
Game4kids.Game.TEXT_STYLE = { font: `20px ${Game4kids.Game.TEXT_FONT}`, fill: "#f7f7f7", align: "left" };

// attributes
Game4kids.Game.prototype.maxActor = null;
Game4kids.Game.prototype.actorCount = null;
Game4kids.Game.prototype.actorCurrentId = null;
Game4kids.Game.prototype.groups = null;
Game4kids.Game.prototype.texts = null;

// inner class
Game4kids.Game.Groups = function (game) {
    this.game = game;
    this.groups = {};

    this.get = function (name) {
        if (typeof this.groups[name] === 'undefined') {
            var group = this.game.add.group();
            group.enableBody = true;
            this.groups[name] = group;
        }
        return this.groups[name];
    }

    this.clear = function () {
        for (var g in this.groups) {
            this.groups[g].forEachAlive(function (actor) { actor.kill(); });
            this.groups[g].destroy(true);
        }
        this.groups = [];
    }
}

// constructor
Game4kids.Game.prototype.initGame = function () {
    this.time.reset();

    this.groups = new Game4kids.Game.Groups(this.game);
    this.maxActor = Game4kids.Game.DEFAULT_MAX_ACTOR;
    this.actorCount = 0;
    this.actorCurrentId = 0;
    this.texts = [];

    this.background = null;
}

Game4kids.Game.prototype.updateGame = function () {
    // print texts
    for (var i in this.texts) {
        this.texts[i].textObject.text = this.texts[i].valueCallback();
    }
}

// properties

// methods
Game4kids.Game.prototype.createGame = function (w, h) {
    this.game.world.setBounds(0, 0, w, h);
};

Object.defineProperty(Game4kids.Game.prototype, 'bgImage', {
    set: function (value) { 
        var data = Blockly.Blocks.imageInterpreter(value);
        this.game.add.tileSprite(0, 0, this.game.world.bounds.width, this.game.world.bounds.height, data.key); 
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Game.prototype, 'bgColor', {
    set: function (value) { this.game.stage.backgroundColor = value; },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Game.prototype, 'cameraXDelta', {
    get: function () {
        if (this.lastCameraX == undefined) {
            return 0;
        } else {
            return this.game.camera.x - this.lastCameraX;
        }
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Game.prototype, 'cameraYDelta', {
    get: function () {
        if (this.lastCameraY == undefined) {
            return 0;
        } else {
            return this.game.camera.y - this.lastCameraY;
        }
    },
    enumerable: true,
    configurable: true
});

Game4kids.Game.prototype.createActor = function (name, image, x = 0, y = 0) {

    // get data
    var data = Blockly.Blocks.imageInterpreter(image);

    // create actor
    var actor = new Game4kids.Actor(this.game, data.key, x, y);
    actor.id = this.actorCurrentId;
    this.actorCurrentId += 1;
    this.groups.get(name).add(actor);
    actor.anchor.setTo(0.5, 0.5);
    actor.checkWorldBounds = true;
    actor.outOfBoundsKill = true;
    this.physics.arcade.enable(actor);

    // default params
    actor.friction = 100;
    actor.body.mass = 1;

    // set body size
    Game4kids.Game.applyStrategy(actor, data.strW, data.strH, data.strOffsetW, data.strOffsetH);

    // on kill event
    var self = this;
    self.actorCount++;
    actor.events.onKilled.add(function (actor) {
        self.actorCount--;
        self.removeActorSignals(actor);
    });

    // check
    this.checkNbActor(actor);

    return actor;
};

Game4kids.Game.applyStrategy = function (actor, strW, strH, strOffsetW, strOffsetH) {
    var w = actor.body.width;
    var h = actor.body.height;

    var width = eval(strW);
    var height = eval(strH);

    var cw = (actor.body.width - width) / 2;
    var ch = (actor.body.height - height) / 2;

    var offsetX = eval(strOffsetW);
    var offsetY = eval(strOffsetH);

    actor.body.setSize(width, height, offsetX, offsetY);
}

Game4kids.Game.prototype.createTween = function (target, parent = null) {
    return new Game4kids.Tween(target, this.game, this.game.tweens, parent);
}

Game4kids.Game.prototype.clear = function () {

    // clear actors
    this.groups.clear();

    // clear texts
    this.clearTexts();

    // clear signals
    this.clearSignals();

    // clear anims
    this.clearAnims();

};

Game4kids.Game.prototype.checkNbActor = function (actor) {
    if (this.actorCount > this.maxActor) {
        var msg = Blockly.Msg.ALERT_MAX_ACTOR.format(this.maxActor);
        alert(msg);
        throw msg;
    }

}

Game4kids.Game.prototype.createText = function (x, y, callback) {
    var text = new Phaser.Text(this.game, x, y, "", Game4kids.Game.TEXT_STYLE);
    this.game.add.existing(text);
    text.fixedToCamera = true;
    this.texts.push({ textObject: text, valueCallback: callback });
};

Game4kids.Game.prototype.clearTexts = function () {
    for (var t in this.texts) {
        this.texts[t].textObject.destroy()
    }
    this.texts = [];
}

Game4kids.Game.prototype.getObjectsAt = function (x, y, groupName) {
    var set = new Set();

    var actors = this.physics.arcade.getObjectsAtLocation(x, y, this.groups.get(groupName));
    for (var actor of actors) {
        set.add(actor);
    }

    return Array.from(set);
}