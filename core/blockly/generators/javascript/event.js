Blockly.JavaScript['signal_create'] = function (block) {
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var code = 'game4k.createSignal()\n';
    if (next) code += next;
    code += '.subscribe(function (value) {\n'
    code += stmt + '\n';
    code += '});';

    return code;
};

Blockly.JavaScript['signal_every'] = function (block) {
    var value = block.getFieldValue('VALUE');
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);

    var code = '.toTime().every(' + value + ')\n';
    if (next) code += next;

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_mouse'] = function (block) {
    var event = block.getFieldValue('EVENT');
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);

    var code = event + '\n';
    if (next) code += next;

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};