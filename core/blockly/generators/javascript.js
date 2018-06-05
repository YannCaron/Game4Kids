/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// constants
Blockly.JavaScript.STMT = 0;
Blockly.JavaScript.SEQ = 1;

// attributes
Blockly.JavaScript.globalVars = null;
Blockly.JavaScript.localVars = null;
Blockly.JavaScript.sequenceStack = null;

// methods
Blockly.JavaScript.initialize = function (workspace) {
    Blockly.JavaScript.globalVars = new Set();
    Blockly.JavaScript.sequenceStack = [];
}

Blockly.JavaScript.finalize = function (workspace) {
    Blockly.JavaScript.definitions_['variables'] +=
        '\nvar game4k = new Game4kids.Game(' + Blockly.Block.windowWidth() + ', ' + Blockly.Block.windowHeight() + ', \'content_game\', { preload: preload, create: create});';
}

Blockly.JavaScript.startScope = function (block = null) {
    if (block && block.arguments_) {
        Blockly.JavaScript.localVars = new Set(block.arguments_);
    } else {
        Blockly.JavaScript.localVars = new Set();
    }
}

Blockly.JavaScript.addGlobal = function (varName) {
    Blockly.JavaScript.globalVars.add(varName);
}

Blockly.JavaScript.check = function (varName) {
    var check = !Blockly.JavaScript.globalVars.has(varName)
        && !Blockly.JavaScript.localVars.has(varName);

    Blockly.JavaScript.localVars.add(varName);

    return check;
}

Blockly.Block.prototype.lineCode = function () {
    return `${Array(20).join('\t')}//id: ${this.id}\n`;
}

Blockly.JavaScript.escape = function (string) {
    return string.replace('\\', '\\\\').replace('\'', '\\\'');
}