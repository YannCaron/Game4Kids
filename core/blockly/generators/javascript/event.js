// constructor
Blockly.JavaScript['signal_create'] = function (block) {
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var code = 'game4k.createSignal()\n';
    if (next) code += next;
    code += Code.indent(1) + '.subscribe(function (value) {\n'
    code += Code.indent(1) + stmt;
    code += Code.indent(1) + '});\n\n';

    return code;
};

Blockly.JavaScript['signal_create_with'] = function (block) {
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var code = 'game4k.createSignal()\n';
    if (next) code += next;
    code += Code.indent(1) + '.toObject(' + varName + ')\n'
    code += Code.indent(1) + '.subscribe(function (' + varName + ') {\n'
    code += Code.indent(1) + stmt;
    code += Code.indent(1) + '}).register(' + varName + ');\n\n';

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

    var code = Code.indent(1) + '.filter(function () { return ' + value + '; })\n';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_every'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = Code.indent(1) + '.toTime().every(function () { return ' + value + '; })\n';
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_mouse'] = function (block) {
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');

    var code = Code.indent(1) + key + event + '\n';
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_keyboard'] = function (block) {
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');

    var code = Code.indent(1) + key + event + '\n';
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_collide'] = function (block) {
    var actor1 = block.getFieldValue('ACTOR1');
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');
    var actor2 = block.getFieldValue('ACTOR2');
    
    var code = Code.indent(1) + '.toEvent(function () {\n';
    code += Code.indent(2) + 'return game.physics.arcade.' + key + '(\n';
    code += Code.indent(3) + 'Game4kids.current.groups.get(\'%1\'),\n'.format(actor1);
    code += Code.indent(3) + 'Game4kids.current.groups.get(\'%1\'),\n'.format(actor2);
    code += Code.indent(3) + 'function (obj1, obj2) { %1 = obj1; %2 = obj2; }\n'.format(actor1, actor2);
    code += Code.indent(2) + ');\n';
    code += Code.indent(1) + '})' + event + '\n';
    // TODO : manage event correctly
    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
