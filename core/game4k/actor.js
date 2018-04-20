// constructor
Game4kids.Actor = function (game, image, x = 0, y = 0) {
    Phaser.Sprite.call(this, game, x, y, image);
    game.add.existing(this);
};

Game4kids.Actor.prototype = Object.create(Phaser.Sprite.prototype);
Game4kids.Actor.prototype.constructor = Game4kids.Actor;

// accessor
Game4kids.Actor.prototype.setBounce = function (bounce) {
    bounce = bounce / 100;
    this.body.bounce.x = bounce;
    this.body.bounce.y = bounce;
}

Game4kids.Actor.prototype.jump = function (speed) {
    var actor = this;
    var savedBounce = this.body.bounce.y;

    this.body.bounce.y = 1;
    this.body.velocity.y = -speed;

    Game4kids.current.createSignal()
        .subscribe(function (value) {
            actor.body.bounce.y = savedBounce;
            this.destroy();
        });
}

Game4kids.Actor.prototype.setFriction = function (friction) {
    friction = friction / 100;
    this.body.friction.x = friction;
    this.body.friction.y = friction;
}

Game4kids.Actor.prototype.setMass = function (mass) {
    this.body.mass = mass / 100;
}

Game4kids.Actor.prototype.setScaleTo = function (factor) {
    this.scale.setTo(factor / 100, factor / 100);
}

Phaser.Sprite.prototype.getAngleWith = function (actor) {
    return this.game.physics.arcade.angleBetween(this, actor).radToDeg();
}

Phaser.Sprite.prototype.getDistanceWith = function (actor) {
    return this.game.physics.arcade.distanceBetween(this, actor);
}

Game4kids.Actor.prototype.setVelocityFromAngle = function (speed) {
    this.game.physics.arcade.velocityFromRotation(this.rotation, speed, this.body.velocity);
}

Game4kids.Actor.prototype.rotateOnCollide = function () {
    var worldCollideCallback = function (sprite, up, down, left, right) {
        if (up) {
            sprite.body.angularVelocity = -sprite.body.velocity.x * this.body.friction.x;
        } else if (down) {
            sprite.body.angularVelocity = sprite.body.velocity.x * this.body.friction.x;
        } else if (left) {
            sprite.body.angularVelocity = sprite.body.velocity.y * this.body.friction.y;
        } else if (right) {
            sprite.body.angularVelocity = -sprite.body.velocity.y * this.body.friction.y;
        }
    };
    this.body.allowRotation = true;
    this.body.onWorldBounds = new Phaser.Signal();
    this.body.onWorldBounds.add(worldCollideCallback, this);
    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(function collide(sprite1, sprite2) {
        sprite1.body.angularVelocity = sprite1.body.velocity.x * this.body.friction.x;
        if (sprite1.body.x < sprite2.body.x) {
            sprite1.body.angularVelocity *= -1;
        }
        sprite1.body.angularVelocity += -sprite2.body.angularVelocity * this.body.friction.y;
    }, this);
}

// methods
Game4kids.Actor.prototype.cameraFollow = function () {
    this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 1, 0.1);
}