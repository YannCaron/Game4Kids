/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

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

// number
Math.pairing = function (x, y) {
    return (x ^ 2 + 3 * x + 2 * x * y + y + y ^ 2) / 2;
}

Math.distQ = function (pt1, pt2) {
    var x = pt1.x - pt2.x;
    var y = pt1.y - pt2.y;
    return x * x + y * y;
}

Math.tolerate = function (a, b, tolerance) {
    return Math.abs(b - a) <= tolerance;
}

// styles
var Styles = Styles || {};

Styles.getStyleOf = function (elementName, styleName) {

    var element = document.getElementById(elementName);
    if (element) {
        var style = window.getComputedStyle(element);
        return style.getPropertyValue(styleName);
    }

}