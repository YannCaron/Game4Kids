Blockly.JavaScript['create_sequence'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var code = 'new Game4kids.Sequence(%1)\n'.format(varName);
    code += '.start();\n'

    return code;
};

Blockly.JavaScript['create_tween'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var time = block.getFieldValue('TIME');

    var code = 'game4k.createTween(%1)'.format(varName);
    code += next;
    code += '.animate(%1).start();\n'.format(time);

    return code;
};

Blockly.JavaScript['tween_to'] = function (block) {
    var property = block.getFieldValue('PROPERTY');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    var relative = block.getFieldValue('RELATIVE') == 'TRUE';
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);

    var method = (relative) ? 'doRelative' : 'do';

    var code = '.%1(\'%2\', %3)'.format(method, property, value);
    code += next;

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};