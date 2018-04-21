// string
String.prototype.format = function () {
    var result = '' + this;
    for (var i = 0; i < arguments.length; i++) {
        result = result.split('%' + (i + 1)).join(arguments[i]);
    }
    return result;
}

// array
/*
TODO : Problem with Phaser4Kids: Phaser.Game.prototype.addText
Array.prototype.diff = function (a) {
    return this.filter(function (i) { return a.indexOf(i) < 0; });
};
*/

// number
Number.prototype.radToDeg = function () {
    return this * 180 / Math.PI;
}

Number.prototype.degToRad = function () {
    return this / 180 * Math.PI;
}
