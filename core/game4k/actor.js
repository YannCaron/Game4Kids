// constructor
Game4kids.Actor = function (game, image, x = 0, y = 0) {
    Phaser.Sprite.call(this, game, x, y, image);
    game.add.existing(this);

    this.drag_ = false;
    this.over_ = false;
};

Game4kids.Actor.prototype = Object.create(Phaser.Sprite.prototype);
Game4kids.Actor.prototype.constructor = Game4kids.Actor;

// accessor
Game4kids.Actor.prototype.setBounce = function (bounce) {
    bounce = bounce / 100;
    this.body.bounce.x = bounce;
    this.body.bounce.y = bounce;
}

Object.defineProperty(Game4kids.Actor.prototype, 'opacity', {
    get: function () { return this.alpha * 100 },
    set: function (value) { this.alpha = value / 100 },
    enumerable: true,
    configurable: true
});

Game4kids.Actor.prototype.setFriction = function (friction) {
    friction = friction / 100;
    this.body.friction.x = friction;
    this.body.friction.y = friction;
}

Game4kids.Actor.prototype.setMass = function (mass) {
    this.body.mass = mass / 100;
}

Object.defineProperty(Game4kids.Actor.prototype, 'scaleX', {
    get: function () { return this.scale.x * 100 },
    set: function (value) { this.scale.x = value / 100 },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Actor.prototype, 'scaleY', {
    get: function () { return this.scale.y * 100 },
    set: function (value) { this.scale.y = value / 100 },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Actor.prototype, 'drag', {
    get: function () {
        if (!this.inputEnabled) {
            this.enableInput_();
        }
        return this.drag_;
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Actor.prototype, 'over', {
    get: function () {
        if (!this.inputEnabled) {
            this.enableInput_();
        }
        return this.over_;
    },
    enumerable: true,
    configurable: true
});

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

Game4kids.Actor.prototype.displaceForeward = function (dist) {
    this.x += dist * Math.cos(this.angle.degToRad());
    this.y += dist * Math.sin(this.angle.degToRad());
}

Game4kids.Actor.prototype.displaceSideways = function (dist) {
    this.x += dist * Math.cos((this.angle - 90).degToRad());
    this.y += dist * Math.sin((this.angle - 90).degToRad());
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

// private
Game4kids.Actor.prototype.enableInput_ = function () {
    this.inputEnabled = true;

    // over
    this.events.onInputOver.add(function () {
        this.over_ = true;
    }, this)

    this.events.onInputOut.add(function () {
        this.over_ = false;
    }, this)

    // drag
    this.events.onInputDown.add(function () {
        this.drag_ = true;
    }, this)

    this.events.onInputUp.add(function () {
        this.drag_ = false;
    }, this)
}