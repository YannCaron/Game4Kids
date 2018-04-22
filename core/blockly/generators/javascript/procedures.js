Blockly.JavaScript['procedures_defreturn'] = function (block) {
    // restart scope to create variables
    Blockly.JavaScript.startScope();

    // Define a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
        var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
        branch = Blockly.JavaScript.prefixLines(
            Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
                '\'' + id + '\''), Blockly.JavaScript.INDENT) + branch;
    }
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
        branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + block.id + '\'') + branch;
    }
    var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
        Blockly.JavaScript.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = Blockly.JavaScript.INDENT + 'return ' + returnValue + ';\n';
    }
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.JavaScript.variableDB_.getName(block.arguments_[i],
            Blockly.Variables.NAME_TYPE);
    }

    var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
        branch + returnValue + '}';
    code = Blockly.JavaScript.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    Blockly.JavaScript.definitions_['%' + funcName] = code;
    return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.JavaScript['procedures_defnoreturn'] =
    Blockly.JavaScript['procedures_defreturn'];

Blockly.JavaScript['procedures_callreturn'] = function (block) {
    // Call a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
            Blockly.JavaScript.ORDER_COMMA) || 'null';
    }

    var code = "eval ('(' + %1.toString() + ')(%2)');\n".format(funcName, args.join(', '));

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['procedures_callnoreturn'] = function (block) {
    // Call a procedure with no return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
            Blockly.JavaScript.ORDER_COMMA) || 'null';
    }

    var code = "eval ('(' + %1.toString() + ')(%2)');\n".format(funcName, args.join(', '));

    return code;
};