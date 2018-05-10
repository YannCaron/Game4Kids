Blockly.JavaScript['logic_between'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);
    var arg2 = Blockly.JavaScript.valueToCode(block, 'ARG2', Blockly.JavaScript.ORDER_ATOMIC);

    var code = '(' + value + ' >= ' + arg1 + ' && ' + value + ' <= ' + arg2 + ')';

    return [code, Blockly.JavaScript.ORDER_RELATIONAL];
  };