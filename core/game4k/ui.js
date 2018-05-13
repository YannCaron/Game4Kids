(function (Game4kids) {
    'use strict';

    // Effects
    Game4kids.Effects = Game4kids.Effects || {}

    Game4kids.Effects.Move = function (x, y) {
        this.on = function (o) {
            o.x += x; 
            o.y += y;
        }
        this.off = function (o) {
            o.x -= x;
            o.y -= y;
        }
    }

    Game4kids.Effects.Tint = function (tint) {
        this.on = function (o) {
            o.tint = tint;
        }
        this.off = function (o) {
            o.tint = 0xffffff;
        }
    }

    // PatchText
    // PatchText.constructor
    Game4kids.PatchText = function (game, source, text, x = 0, y = 0, style = null) {
        var content = Phaser.readNinePatchContentRect(game, source);
        var text = new Phaser.Text(game, content.margin.left, content.margin.top, text, style)

        var w = text.width + content.margin.left + content.margin.right;
        var h = text.height + content.margin.top + content.margin.bottom;

        Phaser.NinePatch.call(this, game, source, w, h, x, y);
        this.addChild(text);
    }

    Game4kids.PatchText.prototype = Object.create(Phaser.NinePatch.prototype);
    Game4kids.PatchText.prototype.constructor = Game4kids.PatchText;

    // Button
    // Button.constructor
    Game4kids.Button = function (game, source, text, x = 0, y = 0, style = null) {
        Game4kids.PatchText.call(this, game, source, text, x, y, style);
        this.inputEnabled = true;
    }

    Game4kids.Button.prototype = Object.create(Game4kids.PatchText.prototype);
    Game4kids.Button.prototype.constructor = Game4kids.Button;

    // Button.methods
    Game4kids.Button.prototype.addClickEffect = function (effect) {
        this.events.onInputDown.add(function () {
            effect.on(this);
        }, this);
        this.events.onInputUp.add(function () {
            effect.off(this);
        }, this);
    }

    Game4kids.Button.prototype.addOverEffect = function (effect) {
        this.events.onInputOver.add(function () {
            effect.on(this);
        }, this);
        this.events.onInputOut.add(function () {
            effect.off(this);
        }, this);
    }

})(Game4kids);