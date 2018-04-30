// constructor
Blockly.JavaScript['signal_create'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var code = '';
    code += 'game4k.createSignal(' + varName + ')';
    code += block.lineCode();
    if (next) code += next;
    code += '.subscribe(function (value) {\n';
    code += stmt;
    code += '});\n';

    return code;
};

Blockly.JavaScript['signal_destroy'] = function (block) {
    var code = 'this.destroy();';
    code += block.lineCode();

    return code;
};
// operator
Blockly.JavaScript['signal_combine'] = function (block) {
    var next1 = Blockly.JavaScript.valueToCode(block, 'NEXT1', Blockly.JavaScript.ORDER_ATOMIC);
    var next2 = Blockly.JavaScript.valueToCode(block, 'NEXT2', Blockly.JavaScript.ORDER_ATOMIC);
    var operator = block.getFieldValue('OPERATOR');

    var code = operator.format(next1, next2);
    code += block.lineCode();

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// properties
Blockly.JavaScript['signal_property'] = function (block) {
    var property = block.getFieldValue('PROPERTY');

    var code = 'this.' + property;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// methods
Blockly.JavaScript['signal_if'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = '.filter(function () { return ' + value + '; })';
    code += block.lineCode();

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_every'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = '.toTime().every(function () { return ' + value + '; })';
    code += block.lineCode();

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_mouse'] = function (block) {
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');

    var code = key + event;
    code += block.lineCode();

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_keyboard'] = function (block) {
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');

    var code = key + event;
    code += block.lineCode();

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_collide'] = function (block) {
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');
    var actor = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ACTOR'), Blockly.Variables.NAME_TYPE);

    var code = '';
    code += '.map(function () {\n';
    code += 'return game4k.game.physics.arcade.%1 (this.getRoot().actor, %2);'.format(key, actor);
    code += block.lineCode();
    code += '})%1\n'.format(event);

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['signal_create_collide'] = function (block) {
    var actor1 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ACTOR1'), Blockly.Variables.NAME_TYPE);
    var key = block.getFieldValue('KEY');
    var event = block.getFieldValue('EVENT');
    var actor2 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ACTOR2'), Blockly.Variables.NAME_TYPE);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var toggle = event[0] == 1;
    var value = event[1] == 1;

    code = 'game4k.createSignal()\n';
    code += '.mapCollisionGroup(\'%1\', \'%2\', \'%3\', %4)'.format(key, actor1, actor2, toggle);
    code += block.lineCode();
    code += '.whenEquals(%1)\n'.format(value);
    code += '.subscribe (function (value, %1) {'.format(actor1 == actor2 ? actor1 : actor1 + ', ' + actor2);
    code += block.lineCode();
    code += stmt;
    code += '});\n'

    return code;
};
