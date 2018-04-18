Blockly.JavaScript.globalVars = null;
Blockly.JavaScript.localVars = null;
Blockly.JavaScript.VAR_USE_BLOCKS = new Set(['variables_get', 'variables_set', 'create_actor', 'math_change']);
Blockly.JavaScript.PROCEDURE_BLOCKS = new Set(['procedures_defnoreturn', 'procedures_defreturn']);

Blockly.JavaScript.initialize = function(workspace){
    Blockly.JavaScript.globalVars = new Set();
    Blockly.JavaScript.localVars = new Set();

    Blockly.JavaScript.promoteGlobal(workspace);
}

Blockly.JavaScript.finalize = function(workspace) {

    // add all other variables
    workspace.getAllVariables()
        .map(item => item.name)
        .filter(item => !Blockly.JavaScript.localVars.has(item))
        .forEach(item => Blockly.JavaScript.globalVars.add(item));

    // create global var line
    var vars = Array.from(Blockly.JavaScript.globalVars);
    Blockly.JavaScript.definitions_['variables'] =
        (vars.length > 0) ? 'var ' + vars.join(', ') + ';' : '';

}

Blockly.JavaScript.promoteGlobal = function (workspace) {
    var blocks = workspace.getTopBlocks(true)
        .filter(item => (Blockly.JavaScript.PROCEDURE_BLOCKS.has(item.type)));

    blocks.forEach(item => {
        var args = new Set(item.getVars());

        Blockly.JavaScript.dfs(item, block => {
            if (Blockly.JavaScript.VAR_USE_BLOCKS.has(block.type)) {
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
