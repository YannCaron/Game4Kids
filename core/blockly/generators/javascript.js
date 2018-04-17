Blockly.JavaScript.globalVars = null;
Blockly.JavaScript.localVars = null;

Blockly.JavaScript.initialize = function(workspace){
    Blockly.JavaScript.globalVars = new Set();
    Blockly.JavaScript.localVars = new Set();

    Blockly.JavaScript.promoteGlobal(workspace);
}

Blockly.JavaScript.finalize = function(workspace) {

    // add all other variables
    Blockly.JavaScript.globalVars.add(
        ...workspace.getAllVariables()
        .map(item => item.name)
        .filter(item => !Blockly.JavaScript.localVars.has(item)));

    // create global var line
    var vars = Array.from(Blockly.JavaScript.globalVars);
    Blockly.JavaScript.definitions_['variables'] =
        (vars.length > 0) ? 'var ' + vars.join(', ') + ';' : '';

}

Blockly.JavaScript.promoteGlobal = function (workspace) {
    var blocks = workspace.getTopBlocks(true)
        .filter(item => (item.type == 'procedures_defnoreturn' || item.type == 'procedures_defreturn'));

    blocks.forEach(item => {
        var args = new Set(item.getVars());

        Blockly.JavaScript.dfs(item, block => {
            if (block.type == 'variables_set' || block.type == 'create_actor') {
                var varName = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

                if (! args.has(varName)) {
                    Blockly.JavaScript.globalVars.add(varName);
                }
            }
        });

    });
}

Blockly.JavaScript.dfs = function(block, callback) {
    let stack = [];
    stack.push(block);

    while (stack.length > 0) {
        var block = stack.pop();
        callback(block);
        stack.push(...block.getChildren());
    }
}

Blockly.JavaScript.check = function(varName) {
    var check = (!Blockly.JavaScript.globalVars.has(varName) &&
        !Blockly.JavaScript.localVars.has(varName))

    Blockly.JavaScript.localVars.add(varName);

    return check;
}
