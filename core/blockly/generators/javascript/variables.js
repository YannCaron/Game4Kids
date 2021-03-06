/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

Blockly.JavaScript['variables_set'] = function (block) {
    // Variable setter.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var code = '';
    if (Blockly.JavaScript.check(varName)) {
        code += 'let ';
    }
    code += varName + ' = ' + argument0 + ';';
    code += block.lineCode();

    return code;
};

Blockly.JavaScript['variables_global'] = function (block) {
    // Variable setter.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    Blockly.JavaScript.addGlobal(varName);

    var code = '';
    code += varName + ' = ' + argument0 + ';';
    code += block.lineCode();

    return code;
};