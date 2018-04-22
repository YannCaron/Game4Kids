Blockly.JavaScript['procedures_callreturn'] = function (block) {
    // Call a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
            Blockly.JavaScript.ORDER_COMMA) || 'null';
    }

    // nothing changed yet
    var code = funcName + '(' + args.join(', ') + ')';

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

    code = '';
    code += 'eval (%1.toString());\n'.format(funcName);
    code += funcName + '(' + args.join(', ') + ');\n';

    return code;
};