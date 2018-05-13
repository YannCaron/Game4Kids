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

    // PatchContent
    // PatchContent.constructor
    Game4kids.PatchContent = function (game, source, content, x = 0, y = 0) {
        var place = Phaser.readNinePatchContentRect(game, source);

        content.x = place.margin.left;
        content.y = place.margin.top;
        var w = content.width + place.margin.left + place.margin.right;
        var h = content.height + place.margin.top + place.margin.bottom;

        Phaser.NinePatch.call(this, game, source, w, h, x, y);
        this.addChild(content);
    }

    Game4kids.PatchContent.prototype = Object.create(Phaser.NinePatch.prototype);
    Game4kids.PatchContent.prototype.constructor = Game4kids.PatchContent;

    // Button
    // Button.constructor
    Game4kids.Button = function (game, source, text, x = 0, y = 0, style = null) {
        var content = new Phaser.Text(game, 0, 0, text, style)

        Game4kids.PatchContent.call(this, game, source, content, x, y, style);
        this.inputEnabled = true;
    }

    Game4kids.Button.prototype = Object.create(Game4kids.PatchContent.prototype);
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