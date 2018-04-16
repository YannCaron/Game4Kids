// override blockly variable_set to add let keyword (needed by signal closure)
Blockly.JavaScript['variables_set'] = function (block) {
    // Variable setter.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return 'let ' + varName + ' = ' + argument0 + ';\n';
};

// constructor
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

Blockly.JavaScript['signal_create_with'] = function (block) {
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var code = 'game4k.createSignal()\n';
    if (next) code += next;
    code += '.toObject(' + varName + ')\n'
    code += '.subscribe(function (' + varName + ') {\n'
    code += stmt + '\n';
    code += '}).register(' + varName + ');\n';

    return code;
};

Blockly.JavaScript['signal_destroy'] = function (block) {
    var code = 'this.destroy();\n';
    return code;
};
// operator
Blockly.JavaScript['signal_combine'] = function (block) {
    var next1 = Blockly.JavaScript.valueToCode(block, 'NEXT1', Blockly.JavaScript.ORDER_ATOMIC);
    var next2 = Blockly.JavaScript.valueToCode(block, 'NEXT2', Blockly.JavaScript.ORDER_ATOMIC);
    var operator = block.getFieldValue('OPERATOR');

    var code = operator.format(next1, next2) + '\n';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// methods
Blockly.JavaScript['signal_if'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = '.filter(function () { return ' + value + '; })\n';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_every'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = '.toTime().every(function () { return ' + value + '; })\n';
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_mouse'] = function (block) {
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');

    var code = key + event + '\n';
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_keyboard'] = function (block) {
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');

    var code = key + event + '\n';
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_collide'] = function (block) {
    var actor1 = block.getFieldValue('ACTOR1');
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');
    var actor2 = block.getFieldValue('ACTOR2');
    
    var code = '.toEvent(function () {\n return game.physics.arcade.collide(Game4kids.current.groups.get(\'%1\'), Game4kids.current.groups.get(\'%2\'));\n })\n'.format(actor1, actor2);
    code += event;
    // TODO : manage event correctly
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
