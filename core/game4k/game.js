// const
Game4kids.Game.DEFAULT_MAX_ACTOR = 500;
Game4kids.Game.TEXT_STYLE = { font: "20px Courier New", fill: "#f7f7f7", align: "left" }; // another choice: DejaVu Sans Mono

// attributes
Game4kids.Game.prototype.maxActor = null;
Game4kids.Game.prototype.actorCount = null;
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
    this.texts = [];
}

Game4kids.Game.prototype.updateGame = function () {
    // print texts
    for (var i in this.texts) {
        this.texts[i].textObject.text = this.texts[i].valueCallback();
    }
}

// properties

// methods
Game4kids.Game.prototype.createGame = function (w, h, bg) {
    this.game.add.tileSprite(0, 0, w, h, bg);
    this.game.world.setBounds(0, 0, w, h);
};

Game4kids.Game.prototype.createActor = function (name, image, x = 0, y = 0) {

    // create actor
    var actor = new Game4kids.Actor(this.game, image, x, y);
    this.groups.get(name).add(actor);
    actor.anchor.setTo(0.5, 0.5);
    actor.checkWorldBounds = true;
    actor.outOfBoundsKill = true;
    this.physics.arcade.enable(actor);

    // default params
    actor.setFriction(100);
    actor.body.mass = 1;

    // set body size
    var size = Math.min(actor.body.width, actor.body.height);
    actor.body.setSize(size, size, (actor.body.width - size) / 2, (actor.body.height - size) / 2);

    // on kill event
    var game4k = this;
    game4k.actorCount++;
    actor.events.onKilled.add(function (actor) {
        game4k.actorCount--;
        game4k.removeActorSignals(actor);
    });

    // check
    this.checkNbActor(actor);

    return actor;
};

Game4kids.Game.prototype.createTween = function(target, parent = null) {
    return new Game4kids.Tween(target, this.game, this.game.tweens, parent);
}

Game4kids.Game.prototype.clear = function () {

    // clear actors
    this.groups.clear();

    // clear texts
    this.clearTexts();

    // clear signals
    this.clearSignals();

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