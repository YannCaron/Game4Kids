// string
String.prototype.format = function () {
    var result = '' + this;
    for (var i = 0; i < arguments.length; i++) {
        result = result.split('%' + (i + 1)).join(arguments[i]);
    }
    return result;
}

String.prototype.startsWith = function (string) {
    return this.indexOf(string) === 0;
};

String.prototype.contains = function (string) {
    return this.indexOf(string) >= 0;
};

// array
var Arrays = Arrays || {};

Arrays.getLast = function (array) {
    return array[array.length - 1];
}

Arrays.diff = function (a1, a2) {
    return a1.filter(function (i) { return a2.indexOf(i) < 0; });
};

// number
Number.prototype.radToDeg = function () {
    return this * 180 / Math.PI;
}

Number.prototype.degToRad = function () {
    return this / 180 * Math.PI;
}
