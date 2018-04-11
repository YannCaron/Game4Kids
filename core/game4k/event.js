// inner class
Game4kids.Event = Game4kids.Event || {};

Game4kids.Event.Event = function (callback) {
    this.owner = null;
    this.interval = 0;
    this.predicat = null;
    this.callback = callback;
    this.game = Game4kids.currentGame;
    this.time = Game4kids.currentGame.time.now;
    this.count = 0;
    this.previous = null;
    this.continuous = false;
}

Game4kids.Event.Event.prototype.run = function () {
    var state = this.predicat ? this.predicat() : null;

    if ((state && (state != this.previous || this.continuous) || state == null) &&
        Game4kids.currentGame.time.now - this.interval > this.time) {
        // check if actor is alive
        if (this.owner instanceof Game4kids.Actor && !this.owner.alive) {
            this.destroy();
            return;
        }

        this.count++;
        this.time = this.game.time.now;
        this.callback(this, this.owner);
    }
    this.previous = state;
};

Game4kids.Event.Event.prototype.destroy = function () {
    this.game.destroyEvent(this);
}

Game4kids.Event.Event.prototype.setInterval = function (interval) {
    this.interval = interval;
}

// attributes
Game4kids.Game.prototype.events = null;

// override
Game4kids.Game.prototype.initEvent = function () {
    this.events = [];
    this.input.mouse.capture = true;
}

Game4kids.Game.prototype.updateEvent = function () {
    // loop on events
    for (var i in this.events) {
        var event = this.events[i];
        event.run();
    }
}

// methods
Game4kids.Game.prototype.destroyEvent = function (event) {
    var index = this.events.indexOf(event);
    this.events.splice(index, 1);
}

// methods.game
Game4kids.Game.prototype.createEvent = function (predicat, callback, continuous) {
    var event = new Game4kids.Event.Event(callback);
    event.predicat = predicat;
    event.continuous = continuous;
    this.events.push(event);
}

Game4kids.Game.prototype.createTimer = function (interval, callback) {
    var event = new Game4kids.Event.Event(callback);
    event.setInterval(interval);
    event.continuous = true;
    this.events.push(event);
}

// methods.actor
Game4kids.Actor.prototype.createEvent = function (predicat, callback, continuous) {
    var event = new Game4kids.Events.Event(callback);
    event.owner = this;
    event.predicat = predicat;
    event.continuous = continuous;
    Game4kids.currentGame.events.push(event);
}

// factories
Game4kids.Game.prototype.onMouseLeftEnter = function (callback) {
    var game = this;
    game.input.mouse.capture = true;
    this.createEvent(function (event) { return game.input.activePointer.leftButton.isDown; }, callback, false);
}

Game4kids.Game.prototype.onMouseLeftExit = function (callback) {
    var game = this;
    this.createEvent(function (event) { return !game.input.activePointer.leftButton.isDown; }, callback, false);
}

Game4kids.Game.prototype.onMouseLeft = function (callback) {
    var game = this;
    this.createEvent(function (event) { return game.input.activePointer.leftButton.isDown; }, callback, true);
}