Blockly.JavaScript.localVars = null;

Blockly.JavaScript.initialize = function(workspace){
}

Blockly.JavaScript.finalize = function(workspace) {
    var variableNames = workspace.getAllVariables()
        .filter(variable => variable.type != Blockly.Block.ACTOR_TYPE)
        .map (variable => variable.name);

    Blockly.JavaScript.definitions_['variables'] =
        'var game4k = new Game4kids.Game(' + Blockly.Block.GAME_WIDTH + ', ' + Blockly.Block.GAME_HEIGHT + ', \'content_game\', { preload: preload, create: create});';
        
    if (variableNames.length > 0) {
        Blockly.JavaScript.definitions_['variables'] +=
            '\nvar ' + variableNames.join(', ') + ';';
    }

}

Blockly.JavaScript.startScope = function () {
    Blockly.JavaScript.localVars = new Set();
}

Blockly.JavaScript.check = function(varName) {
    var check = !Blockly.JavaScript.localVars.has(varName);

    Blockly.JavaScript.localVars.add(varName);

    return check;
}

Blockly.Block.prototype.lineCode = function () {
    return `${Array(20).join('\t')}//id: ${this.id}\n`;
}