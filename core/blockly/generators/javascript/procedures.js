/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

Blockly.JavaScript['old_procedures_defreturn'] = Blockly.JavaScript['procedures_defreturn'];
Blockly.JavaScript['procedures_defreturn'] = function (block) {
    // restart scope to create variables
    Blockly.JavaScript.startScope(block);
    var generation = Blockly.JavaScript['old_procedures_defreturn'](block);
    Blockly.JavaScript.startScope();
    return generation;
}

Blockly.JavaScript['old_procedures_defnoreturn'] = Blockly.JavaScript['procedures_defnoreturn'];
Blockly.JavaScript['procedures_defnoreturn'] = function (block) {
    // restart scope to create variables
    Blockly.JavaScript.startScope(block);
    var generation = Blockly.JavaScript['old_procedures_defnoreturn'](block);
    Blockly.JavaScript.startScope();
    return generation;
}

Blockly.JavaScript['procedures_callreturn'] = function(block) {
    // Call a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
          Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var self = args.length > 0 ? 'this, ' : 'this';

    var code = funcName + '.call(' + self + args.join(', ') + ').call(this)';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.JavaScript['procedures_callnoreturn'] = function(block) {
    // Call a procedure with no return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
          Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var self = args.length > 0 ? 'this, ' : 'this';
    var code = funcName + '.call(' + self + args.join(', ') + ');\n';
    return code;
  };