// namespace
Game4kids.React = Game4kids.React || {

    valueOf: function (f) {
        if (typeof f === 'function') return f();
        else return f;
    },

};

// class
// react
Game4kids.React.Signal = function (parent = null, actor = null) {
    this.callback = null;
    this.parent = parent;
    this.actor = actor;
    this.count = 0;
    this.lapse = 0;
    this.duration = 0;
    this.now = Game4kids.current.game.time.now;
    this.time = Game4kids.current.game.time.now;
};

Game4kids.React.Signal.prototype.destroy = function () {
    Game4kids.current.removeSignal(this);
}

Game4kids.React.Signal.prototype.subscribe = function (callback) {
    this.callback = callback;
    return this;
}

Game4kids.React.Signal.prototype.getRoot = function () {
    if (this.parent != null) return this.parent.getRoot();
    return this;
}

Game4kids.React.Signal.prototype.setParent = function (parent) {
    this.parent = parent;
}

Game4kids.React.Signal.prototype.emit = function (value) {
    this.count++;
    this.lapse = (Game4kids.current.game.time.now - this.time) / 1000;
    this.time = Game4kids.current.game.time.now;
    this.duration = (Game4kids.current.game.time.now - this.now) / 1000
    if (this.callback) {
        arguments[0] = value;
        if (this.actor != null) {
            this.callback(...arguments, this.actor);
        } else {
            this.callback(...arguments);
        }
    }
}

// react.filters
Game4kids.React.Signal.prototype.filter = function (predicate) {
    var signal = new Game4kids.React.Signal(this);

    this.subscribe(function (value) {
        arguments[0] = value;
        if (predicate.call(this, ...arguments)) {
            arguments[0] = value;
            signal.emit(...arguments);
        }
    });

    return signal;
}

Game4kids.React.Signal.prototype.toggle = function () {
    this.previous = null;

    // manage here for collision
    return this.filter(function (value) {
        if (value != this.previous) {
            this.previous = value;
            return true;
        }
        return false;
    }.bind(this));

}

Game4kids.React.Signal.prototype.every = function (interval) {
    var self = this;

    return this.filter(function (value) {
        if (typeof self.previous === 'undefined') self.previous = value;

        if (value >= self.previous + Game4kids.React.valueOf(interval)) {
            self.previous = value;
            return true;
        }
        return false;
    });
}

Game4kids.React.Signal.prototype.ignoreFirst = function () {
    var self = this;

    return this.filter(function (value) {
        if (typeof self.first === 'undefined') self.first = true;

        if (!self.first) {
            return true;
        }
        self.first = false;
        return false;
    });
}

Game4kids.React.Signal.prototype.dash = function (interval1, interval2 = null) {
    var self = this;
    var toggle = false;

    return this.filter(function (value) {
        if (typeof self.previous === 'undefined') self.previous = null;

        var interval = !toggle && interval2 ? Game4kids.React.valueOf(interval2) : Game4kids.React.valueOf(interval1);

        if (value >= self.previous + interval) {
            toggle = !toggle;
            self.previous = value;
        }
        return toggle;
    });
}

Game4kids.React.Signal.prototype.whenEquals = function (compare) {

    return this.filter(function (value) {
        return value == Game4kids.React.valueOf(compare);
    });

}

// react.combine
Game4kids.React.Signal.prototype.combineWith = function (signal2) {
    var signal = new Game4kids.React.Signal(this);
    signal2.getRoot().setParent(this);

    this.subscribe(function (value) {
        arguments[0] = value;
        signal.emit(...arguments);
    });

    signal2.subscribe(function (value) {
        arguments[0] = value;
        signal.emit(...arguments);
    });

    return signal;
}

// react.map
Game4kids.React.Signal.prototype.map = function (mapper) {
    var signal = new Game4kids.React.Signal(this);

    this.subscribe(function (value) {
        arguments[0] = value;
        value = mapper.bind(this)(...arguments) || false;
        arguments[0] = value;
        signal.emit(...arguments);
    });

    return signal;
}

Game4kids.React.Signal.prototype.mapCollision = function (other, checkCollision) {
    var signal = new Game4kids.React.Signal(this);
    var previousFrame = 0;
    var actor = this.getRoot().actor;

    if (checkCollision) Game4kids.current.registerCollision(actor, other);

    this.subscribe(function (frame) {
        var value = Game4kids.current.game.physics.arcade.overlap(actor, other);
        if (!value) {
            value = frame > previousFrame + 1;
            previousFrame = frame;
        }
        signal.emit(value, actor);

    });

    return signal;
}

Game4kids.React.Signal.prototype.mapCollisionGroup = function (group1, group2, checkCollision, toggle) {
    var collisions = new Map();
    var signal = new Game4kids.React.Signal(this);

    if (checkCollision) Game4kids.current.registerCollision(Game4kids.current.groups.get(group1), Game4kids.current.groups.get(group2));

    this.subscribe(function (frame) {
        Game4kids.current.game.physics.arcade.overlap(
            Game4kids.current.groups.get(group1),
            Game4kids.current.groups.get(group2),
            function (obj1, obj2) {

                var id = Math.pairing(obj1.id, obj2.id);
                var dist = Math.distQ(obj1, obj2);

                var data = collisions.get(id);
                if (!data || (frame > data.frame + 2 && !Math.tolerate(dist, data.dist, 1)) || !toggle) {
                    if (group1 != group2) {
                        signal.emit(true, obj1, obj2);
                    } else {
                        signal.emit(true, obj1);
                        signal.emit(true, obj2);
                    }
                }
                collisions.set(id, { frame: frame, dist: dist, obj1: obj1, obj2: obj2 });

            });

        for (let [key, data] of collisions) {
            if (frame > data.frame + 1 && !Math.tolerate(Math.distQ(data.obj1, data.obj2), data.dist, 1)) {
                if (group1 != group2) {
                    signal.emit(false, data.obj1, data.obj2);
                } else {
                    signal.emit(false, data.obj1);
                    signal.emit(false, data.obj2);
                }
                collisions.delete(key);
            }
        }
    });

    return signal;
}

Game4kids.React.Signal.prototype.toObject = function (object) {
    return this.map(function () { return object; });
}

Game4kids.React.Signal.prototype.toTime = function () {
    return this.map(function () { return Game4kids.current.game.time.now / 1000; });
}

// game
Game4kids.Game.prototype.signals = null;
Game4kids.Game.prototype.actorSignals = null;
Game4kids.Game.prototype.count = null;
Game4kids.Game.prototype.collisions = null;

Game4kids.Game.prototype.initEvent = function () {
    this.signals = [];
    this.actorSignals = new Map();
    this.count = 0;
    this.input.mouse.capture = true;
    this.input.keyboard.capture = true;
    this.collisions = new Set();

    var game = this.game;
}

Game4kids.Game.prototype.updateEvent = function () {
    this.count++;

    // loop on signals
    this.signals.forEach(signal => signal.emit(this.count)); // Important! do not send argument list

    this.collisions.forEach(collision => this.game.physics.arcade.collide(collision.obj1, collision.obj2));
}

// method
Game4kids.Game.prototype.createSignal = function (actor = null) {
    var signal = new Game4kids.React.Signal(null, actor);
    this.signals.push(signal);

    if (actor != null) this.registerActorSignals(actor, signal);

    return signal;
}

Game4kids.Game.prototype.removeSignal = function (signal) {
    const index = this.signals.indexOf(signal);

    if (index != -1) {
        this.signals.splice(index, 1);
    }

    if (signal.parent != null) {
        signal.parent.destroy();
    }

}

Game4kids.Game.prototype.registerCollision = function (obj1, obj2) {
    this.collisions.add({ obj1: obj1, obj2: obj2 });
}

Game4kids.Game.prototype.registerActorSignals = function (actor, signal) {
    if (!this.actorSignals.has(actor)) {
        this.actorSignals.set(actor, new Set());
    }
    this.actorSignals.get(actor).add(signal);
}

Game4kids.Game.prototype.removeActorSignals = function (actor) {
    if (!this.actorSignals.has(actor)) return;

    var signals = this.actorSignals.get(actor);
    this.actorSignals.delete(actor);

    signals.forEach(signal => {
        this.removeSignal(signal);
    });
}

Game4kids.Game.prototype.clearSignals = function () {
    this.signals = [];
    this.collisions.clear();
}
