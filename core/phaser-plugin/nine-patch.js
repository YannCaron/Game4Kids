/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

(function (Phaser) {
    'use strict';

    // private
    var add_ = (accumulator, currentValue) => accumulator + currentValue;

    var readTileInfo_ = function (to, colorProvider) {
        var spaces = [];
        var counter = 0;
        var oldColor = null;

        spaces.push(1);
        for (var i = 0; i < to; i++) {
            var color = colorProvider(i);
            if (oldColor != null && color != oldColor) {
                spaces.push(counter);
                counter = 0;
            }
            counter++;

            oldColor = color;
        }
        spaces.push(counter - 1);

        return spaces;
    }

    var createTile_ = function (game, source, hSpaces, vSpaces, idx, idy) {
        var tile = game.make.bitmapData(hSpaces[idx] - 1, vSpaces[idy] - 1);

        var x = hSpaces.filter((el, id) => id < idx).reduce(add_)
        var y = vSpaces.filter((el, id) => id < idy).reduce(add_)

        tile.copy(source, x, y, hSpaces[idx], vSpaces[idy], -1, -1);
        return tile;
    }

    var loadBitmap_ = function (game, source) {
        var image = game.cache.getImage(source);
        var bmp = game.make.bitmapData(image.width, image.height);
        bmp.draw(source, 0, 0);
        bmp.update();
        return bmp;
    }

    var createPatch_ = function (game, source, width, height) {

        var bmp = loadBitmap_(game, source);

        // read first lines pixels
        var hSpaces = readTileInfo_(bmp.width - 1, i => bmp.getPixelRGB(i, 0).color);
        var vSpaces = readTileInfo_(bmp.height - 1, i => bmp.getPixelRGB(0, i).color);

        if (hSpaces.length != 4 || vSpaces.length != 4) throw 'Bad nine patch format [' + source + '].\nMust contain tile informations in first and last lines of pixels.';

        var topLeft = createTile_(game, source, hSpaces, vSpaces, 1, 1);
        var topCenter = createTile_(game, source, hSpaces, vSpaces, 2, 1);
        var topRight = createTile_(game, source, hSpaces, vSpaces, 3, 1);
        var middleLeft = createTile_(game, source, hSpaces, vSpaces, 1, 2);
        var middleCenter = createTile_(game, source, hSpaces, vSpaces, 2, 2);
        var middleRight = createTile_(game, source, hSpaces, vSpaces, 3, 2);
        var bottomLeft = createTile_(game, source, hSpaces, vSpaces, 1, 3);
        var bottomCenter = createTile_(game, source, hSpaces, vSpaces, 2, 3);
        var bottomRight = createTile_(game, source, hSpaces, vSpaces, 3, 3);

        var sprite = game.make.bitmapData(width, height);

        var fillWidth = width - (topLeft.width + topRight.width);
        var fillHeight = height - (topLeft.height + bottomLeft.height);

        var centerX = topLeft.width;
        var middleY = topLeft.height;

        var rightX = width - topRight.width;
        var bottomY = height - bottomLeft.height;

        sprite.draw(topLeft, 0, 0);
        sprite.draw(topCenter, centerX, 0, fillWidth);
        sprite.draw(topRight, rightX, 0);

        sprite.draw(middleLeft, 0, middleY, middleLeft.width, fillHeight);
        sprite.draw(middleCenter, centerX, middleY, fillWidth, fillHeight);
        sprite.draw(middleRight, rightX, middleY, middleRight.width, fillHeight);

        sprite.draw(bottomLeft, 0, bottomY);
        sprite.draw(bottomCenter, centerX, bottomY, fillWidth);
        sprite.draw(bottomRight, rightX, bottomY);

        return sprite;
    }

    Phaser.readNinePatchContentRect = function (game, source) {
        var bmp = loadBitmap_(game, source);

        // read last lines pixels
        var hSpaces = readTileInfo_(bmp.width, i => bmp.getPixelRGB(i, bmp.height - 1).color);
        var vSpaces = readTileInfo_(bmp.height - 1, i => bmp.getPixelRGB(bmp.width - 1, i).color);

        if (hSpaces.length != 4 || vSpaces.length != 4) throw 'Bad nine patch format.\nMust contain tile informations in first ans last lines of pixels.';

        var x = hSpaces.filter((el, id) => id <= 1).reduce(add_)
        var y = vSpaces.filter((el, id) => id <= 1).reduce(add_)
        var w = hSpaces.filter((el, id) => id >= 1 && id <= 2).reduce(add_)
        var h = vSpaces.filter((el, id) => id >= 1 && id <= 2).reduce(add_)

        return { x: x, y: y, width: w, height: h, margin: { top: y, bottom: vSpaces[3], left: x, right: hSpaces[3]} };
    }

    // constructor
    Phaser.NinePatch = function (game, source, width, height, x = 0, y = 0) {
        var sprite = createPatch_(game, source, width, height);
        Phaser.Sprite.call(this, game, x, y, sprite);
        this.content = Phaser.readNinePatchContentRect(game, source);
    };

    Phaser.NinePatch.prototype = Object.create(Phaser.Sprite.prototype);
    Phaser.NinePatch.prototype.constructor = Phaser.NinePatch;

    // game.add.ninePatch
    Phaser.GameObjectFactory.prototype.ninePatch = function (x, y, width, height, source, group) {
        if (group === undefined) { group = this.world; }
        return group.add(new Phaser.NinePatch(this.game, source, width, height, x, y));
    };

    Phaser.GameObjectCreator.prototype.ninePatch = function (x, y, width, height, source, group) {
        return new Phaser.NinePatch(this.game, source, width, height, x, y);
    };

})(Phaser)
