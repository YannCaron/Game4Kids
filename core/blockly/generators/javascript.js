// constants
Blockly.JavaScript.STMT = 0;
Blockly.JavaScript.SEQ = 1;

// attributes
Blockly.JavaScript.localVars = null;
Blockly.JavaScript.sequenceStack = null;

// methods
Blockly.JavaScript.initialize = function(workspace){
    Blockly.JavaScript.sequenceStack = [];
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

Blockly.JavaScript.startScope = function (block = null) {
    if (block && block.arguments_) {
        Blockly.JavaScript.localVars = new Set(block.arguments_);
    } else {
        Blockly.JavaScript.localVars = new Set();
    }
}

Blockly.JavaScript.check = function(varName) {
    var check = !Blockly.JavaScript.localVars.has(varName);

    Blockly.JavaScript.localVars.add(varName);

    return check;
}

Blockly.Block.prototype.lineCode = function () {
    return `${Array(20).join('\t')}//id: ${this.id}\n`;
}