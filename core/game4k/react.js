// namespace
Game4kids.React = Game4kids.React || {

    valueOf: function(f) {
        if (typeof f === 'function') return f();
        else return f;
    },

};

// class
// react
Game4kids.React.Signal = function (parent = null) {
    this.callback = null;
    this.parent = parent;
};

Game4kids.React.Signal.prototype.subscribe = function (callback) {
    this.callback = callback;
    return this.getRoot();
}

Game4kids.React.Signal.prototype.getRoot = function () {
    if (this.parent != null) return this.parent.getRoot();
    return this;
}

Game4kids.React.Signal.prototype.emit = function (value) {
    if (this.callback) {
        arguments[0] = value;
        this.callback(...arguments);

        //this.callback(value);
    }
}

// react.filters
Game4kids.React.Signal.prototype.filter = function (predicate) {
    var signal = new Game4kids.React.Signal(this);

    this.subscribe(function (value) {
        if (predicate(value)) {
            arguments[0] = value;
            signal.emit(...arguments);
        }
    });

    return signal;
}

Game4kids.React.Signal.prototype.toggle = function () {
    var self = this;

    return this.filter(function (value) {
        if (typeof self.previous === 'undefined') self.previous = null;
        
        if (value != self.previous) {
            self.previous = value;
            return true;
        }
        return false;
    });

}

Game4kids.React.Signal.prototype.every = function(interval) {
    var self = this;

    return this.filter(function (value) {
        if (typeof self.previous === 'undefined') self.previous = null;

        if (value >= self.previous + Game4kids.React.valueOf(interval)) {
            self.previous = value;
            return true;
        }
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

// map
Game4kids.React.Signal.prototype.toEvent = function (event) {
    var signal = new Game4kids.React.Signal(this);

    this.subscribe(function (value) {
        arguments[0] = event();
        signal.emit(...arguments);
    });

    return signal;
}

Game4kids.React.Signal.prototype.toObject = function (object) {
    var signal = new Game4kids.React.Signal(this);

    this.subscribe(function (value) {
        arguments[0] = object;
        signal.emit(...arguments);
    });

    return signal;
}

Game4kids.React.Signal.prototype.toTime = function () {
    var signal = new Game4kids.React.Signal(this);

    this.subscribe(function (value) {
        arguments[0] = Game4kids.current.game.time.now / 1000;
        signal.emit(...arguments);
    });

    return signal;
}

Game4kids.React.Signal.prototype.passObject = function (object) {
    var signal = new Game4kids.React.Signal(this);

    this.subscribe(function (value) {
        arguments[0] = value;
        signal.emit(...arguments, object);
    });

    return signal;
}

// game
Game4kids.Game.prototype.signals = null;
Game4kids.Game.prototype.count = null;

Game4kids.Game.prototype.initEvent = function () {
    this.signals = [];
    this.count = 0;
    this.input.mouse.capture = true;

    var game = this.game;
}

Game4kids.Game.prototype.updateEvent = function () {
    this.count++;

    // loop on signals
    for (var i in this.signals) {
        var signal = this.signals[i];
        signal.emit(this.count);
    }
}

// method
Game4kids.Game.prototype.createSignal = function() {
    var signal = new Game4kids.React.Signal();
    this.signals.push(signal);
    return signal;
}
