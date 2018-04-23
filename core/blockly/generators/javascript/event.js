// constructor
Blockly.JavaScript['signal_create'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var code = '';
    code += 'game4k.createSignal(' + varName + ')\n';
    if (next) code += next;
    code += '.subscribe(function (value) {\n';
    code += stmt;
    code += '});\n\n';

    return code;
};

Blockly.JavaScript['signal_create_collide'] = function (block) {
    var actor1 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ACTOR1'), Blockly.Variables.NAME_TYPE);
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');
    var actor2 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ACTOR2'), Blockly.Variables.NAME_TYPE);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var code = '{\n';
    code += 'let %1;\n'.format(actor1);
    code += 'let %1;\n'.format(actor2);
    code += 'game4k.createSignal()\n';
    code += '.map(function () {\n';
    code += 'return game4k.game.physics.arcade.' + key + '(\n';
    code += 'Game4kids.current.groups.get(\'%1\'),\n'.format(actor1);
    code += 'Game4kids.current.groups.get(\'%1\'),\n'.format(actor2);
    code += 'function (obj1, obj2) { %1 = obj1; %2 = obj2; }\n'.format(actor1, actor2);
    code += ');\n';
    code += '})' + event + '\n';
    code += '.subscribe (function (value) {\n';
    code += stmt;
    code += '});\n}\n'
    // TODO : manage event correctly

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
    var actor1 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ACTOR1'), Blockly.Variables.NAME_TYPE);
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');
    var actor2 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ACTOR2'), Blockly.Variables.NAME_TYPE);

    var code = '';
    code += '.map(function () {\n';
    code += 'return game4k.game.physics.arcade.%1 (%2, %3);\n'.format(key, actor1, actor2);
    code += '})%1\n'.format(event);

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
