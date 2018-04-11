// const
Game4kids.Game.DEFAULT_MAX_ACTOR = 500;

// attributes
Game4kids.Game.prototype.maxActor = null;
Game4kids.Game.prototype.actorCount = null;
Game4kids.Game.prototype.groups = null;

// inner class
Game4kids.Game.Groups = function (game) {
    this.groups = {};
    this.game = game;

    this.get = function (name) {
        if (typeof this.groups[name] === 'undefined') {
            var group = this.game.add.group();
            group.enableBody = true;
            this.groups[name] = group;
        }
        return this.groups[name];
    }
}

// constructor
Game4kids.Game.prototype.initGame = function () {
    this.groups = new Game4kids.Game.Groups(this.game);
    this.maxActor = Game4kids.Game.DEFAULT_MAX_ACTOR;
    this.actorCount = 0;
}

Game4kids.Game.prototype.createActor = function (name, image, x = 0, y = 0) {

    // create actor
    //var actor = this.groups.get(name).create(x, y, image);
    var actor = new Game4kids.Actor(this.game, image, x, y);
    this.groups.get(name).add(actor);
    actor.anchor.setTo(0.5, 0.5);
    actor.checkWorldBounds = true;
    actor.outOfBoundsKill = true;
    this.physics.arcade.enable(actor);
    actor.setFriction(100);

    // set body size
    var size = Math.min(actor.body.width, actor.body.height);
    actor.body.setSize(size, size, (actor.body.width - size) / 2, (actor.body.height - size) / 2);

    // check
    this.checkNbActor(actor);

    return actor;
};

// methods
Game4kids.Game.prototype.createGame = function (w, h, bg) {
    this.game.add.tileSprite(0, 0, w, h, bg);
    this.game.world.setBounds(0, 0, w, h);
};

Game4kids.Game.prototype.checkNbActor = function (actor) {
    if (this.actorCount > this.maxActor) {
        var msg = Blockly.Msg.ALERT_MAX_ACTOR.format(this.maxActor);
        alert(msg);
        throw msg;
    }

    var game = this;
    game.actorCount++;
    actor.events.onKilled.add(function (obj) {
        game.actorCount--;
    });

}
