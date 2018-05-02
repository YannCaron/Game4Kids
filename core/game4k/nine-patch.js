Game4kids.NinePatch = Game4kids.NinePatch || {
    add: (accumulator, currentValue) => accumulator + currentValue,
}

Game4kids.NinePatch.readTileInfo = function(to, colorProvider) {
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

Game4kids.NinePatch.createTile = function(game, source, hSpaces, vSpaces, idx, idy) {
    var tile = game.make.bitmapData(hSpaces[idx] - 1, vSpaces[idy] - 1);

    var x = hSpaces.filter((el, id) => id < idx).reduce(Game4kids.NinePatch.add)
    var y = vSpaces.filter((el, id) => id < idy).reduce(Game4kids.NinePatch.add)

    tile.copy(source, x, y, hSpaces[idx], vSpaces[idy], -1, -1);
    return tile;
}

Game4kids.NinePatch.loadBitmap = function (game, source) {
    var image = game.cache.getImage(source);
    var bmp = game.make.bitmapData(image.width, image.height);
    bmp.draw(source, 0, 0);
    bmp.update();
    return bmp;
}

Game4kids.NinePatch.createPatch = function(game, source, width, height) {

    var bmp = Game4kids.NinePatch.loadBitmap(game, source);

    // read first lines pixels
    var hSpaces = Game4kids.NinePatch.readTileInfo(bmp.width, i => bmp.getPixelRGB(i, 0).color);
    var vSpaces = Game4kids.NinePatch.readTileInfo(bmp.height - 1, i => bmp.getPixelRGB(0, i).color);

    if (hSpaces.length != 4 || vSpaces.length != 4) throw 'Bad nine patch format.\nMust contain tile informations in first ans last lines of pixels.';

    var topLeft = Game4kids.NinePatch.createTile(game, source, hSpaces, vSpaces, 1, 1);
    var topCenter = Game4kids.NinePatch.createTile(game, source, hSpaces, vSpaces, 2, 1);
    var topRight = Game4kids.NinePatch.createTile(game, source, hSpaces, vSpaces, 3, 1);
    var middleLeft = Game4kids.NinePatch.createTile(game, source, hSpaces, vSpaces, 1, 2);
    var middleCenter = Game4kids.NinePatch.createTile(game, source, hSpaces, vSpaces, 2, 2);
    var middleRight = Game4kids.NinePatch.createTile(game, source, hSpaces, vSpaces, 3, 2);
    var bottomLeft = Game4kids.NinePatch.createTile(game, source, hSpaces, vSpaces, 1, 3);
    var bottomCenter = Game4kids.NinePatch.createTile(game, source, hSpaces, vSpaces, 2, 3);
    var bottomRight = Game4kids.NinePatch.createTile(game, source, hSpaces, vSpaces, 3, 3);

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

Game4kids.NinePatch.readContentRect = function (game, source) {
    var bmp = Game4kids.NinePatch.loadBitmap(game, source);

    // read last lines pixels
    var hSpaces = Game4kids.NinePatch.readTileInfo(bmp.width, i => bmp.getPixelRGB(i, bmp.height-1).color);
    var vSpaces = Game4kids.NinePatch.readTileInfo(bmp.height - 1, i => bmp.getPixelRGB(bmp.width-1, i).color);

    if (hSpaces.length != 4 || vSpaces.length != 4) throw 'Bad nine patch format.\nMust contain tile informations in first ans last lines of pixels.';

    var x = hSpaces.filter((el, id) => id <= 1).reduce(Game4kids.NinePatch.add)
    var y = vSpaces.filter((el, id) => id <= 1).reduce(Game4kids.NinePatch.add)
    var w = hSpaces.filter((el, id) => id >= 1 && id <= 2).reduce(Game4kids.NinePatch.add)
    var h = vSpaces.filter((el, id) => id >= 1 && id <= 2).reduce(Game4kids.NinePatch.add)

    return [x, y, w, h];
}