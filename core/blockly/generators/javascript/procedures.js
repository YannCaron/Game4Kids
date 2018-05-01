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
