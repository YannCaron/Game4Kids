// constructor
Game4kids.Actor = function (game, image, x = 0, y = 0) {
    Phaser.Sprite.call(this, game, x, y, image);
    game.add.existing(this);

    this.drag_ = false;
    this.over_ = false;
};

Game4kids.Actor.prototype = Object.create(Phaser.Sprite.prototype);
Game4kids.Actor.prototype.constructor = Game4kids.Actor;

Game4kids.Actor.TEXT_STYLE = { font: `16px ${Game4kids.Game.TEXT_FONT}`, fill: "#0f0f0f", align: "left" }; 
Game4kids.Actor.GRAVITY_FACTOR = 25;
Game4kids.Actor.SAY_PLACEMENT_FACTOR = 0.25;

// accessor
Object.defineProperty(Game4kids.Actor.prototype, 'bounce', {
    get: function () { return this.body.bounce.x * 100 },
    set: function (value) { 
        value = value / 100;
        this.body.bounce.x = value;
        this.body.bounce.y = value;
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Actor.prototype, 'opacity', {
    get: function () { return this.alpha * 100 },
    set: function (value) { this.alpha = value / 100 },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Actor.prototype, 'friction', {
    get: function () { return this.body.friction.x * 100 },
    set: function (value) { 
        value = value / 100;
        this.body.friction.x = value;
        this.body.friction.y = value;
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Actor.prototype, 'mass', {
    get: function () { return this.body.mass * 100 },
    set: function (value) { this.body.mass = value / 100; },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Actor.prototype, 'gravity', {
    get: function () { return this.body.gravity.y / Game4kids.Actor.GRAVITY_FACTOR; },
    set: function (value) { this.body.gravity.y = value * Game4kids.Actor.GRAVITY_FACTOR;; },
    enumerable: true,
    configurable: true
});

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
//maxVelocity
Object.defineProperty(Game4kids.Actor.prototype, 'maxVelocity', {
    get: function () {
        return this.body.maxVelocity.x;
    },
    set: function (value) {
        this.body.maxVelocity.x = value;
        this.body.maxVelocity.y = value;
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Game4kids.Actor.prototype, 'velocityFromAngle', {
    get: function () {
        return Math.sqrt(Math.pow(this.body.velocity.x, 2) + Math.pow(this.body.velocity.y, 2));
    },
    set: function (value) {
        this.game.physics.arcade.velocityFromRotation(this.rotation, value, this.body.velocity);
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
    this.body.velocity.y = -(this.body.gravity.y * speed / 100);

    Game4kids.current.createSignal()
        .subscribe(function (value) {
            actor.body.bounce.y = savedBounce;
            this.destroy();
        });
}

Game4kids.Actor.Speech = function (actor, string) {
    this.actor_ = actor;
    this.text_ = null;
    this.patch = null;
}

Game4kids.Actor.Speech.prototype.build = function (string) {
    if (typeof string == Array) string = string.join('\n');

    var content = Phaser.readNinePatchContentRect(this.actor_.game, 'speech');
    var x = this.actor_.x + Game4kids.Actor.SAY_PLACEMENT_FACTOR * this.width;
    var y = this.actor_.y - (Game4kids.Actor.SAY_PLACEMENT_FACTOR * this.width + h);

    // create text
    this.text_ = new Phaser.Text(this.actor_.game, x + content.x, content.y, string, Game4kids.Actor.TEXT_STYLE)

    var w = this.text_.width + content.margin.left + content.margin.right;
    var h = this.text_.height + content.margin.top + content.margin.bottom;

    this.patch = this.actor_.addChild(game4k.game.make.ninePatch(0, 0, w, h, 'speech'));
    this.actor_.addChild(this.text_);
}

Game4kids.Actor.prototype.say = function (string) {
    var speech = new Game4kids.Actor.Speech(this, string);
    speech.build();
}

Game4kids.Actor.prototype.toFront = function () {
    if (this.parent) {
        this.parent.bringToTop(this);

        if (this.parent.parent) {
            this.parent.parent.bringToTop(this.parent);
        }
    }
}

Game4kids.Actor.prototype.toBack = function () {
    if (this.parent) {
        this.parent.sendToBack(this);

        if (this.parent.parent) {
            this.parent.parent.sendToBack(this.parent);

            if (Game4kids.current.background) {
                this.parent.parent.sendToBack(Game4kids.current.background);
            }
        }
    }
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