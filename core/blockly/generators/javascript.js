Blockly.JavaScript.localVars = null;

Blockly.JavaScript.initialize = function(workspace){
}

Blockly.JavaScript.finalize = function(workspace) {
    Blockly.JavaScript.definitions_['variables'] =
        'var game4k = new Game4kids.Game(' + Blockly.Block.GAME_WIDTH + ', ' + Blockly.Block.GAME_HEIGHT + ', \'content_game\', { preload: preload, create: create});';

}

Blockly.JavaScript.startScope = function () {
    Blockly.JavaScript.localVars = new Set();
}

Blockly.JavaScript.check = function(varName) {
    var check = !Blockly.JavaScript.localVars.has(varName);

    Blockly.JavaScript.localVars.add(varName);

    return check;
}

// error management
// TODO
/*Blockly.JavaScript.manageError = function(message, file, line, col, err) {
    alert(`A ${err.name} occured !\n${err.message}\nLine: ${err.lineNumber}`);
    return false;
}*/
/*
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    alert("Error occured: " + errorMsg);//or any message
    return false;
}*/
