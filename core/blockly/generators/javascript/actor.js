/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// constructor
Blockly.JavaScript['create_actor'] = function (block) {
    var img = Blockly.JavaScript.valueToCode(block, 'IMG', Blockly.JavaScript.ORDER_ATOMIC);
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);

    var code = '';
    if (Blockly.JavaScript.check(varName)) {
        code += 'let ';
    }
    code += '%1 = game4k.createActor(\'%1\', %2, %3, %4);'.format(varName, img, x, y);
    code += block.lineCode();

    return code;
};

Blockly.JavaScript['actor_object'] = function (block) {
    var variable_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var code = variable_var;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// properties
Blockly.JavaScript['actor_get'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var property = block.getFieldValue('PROPERTY');

    var code = varName + '.' + property;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['actor_get_custom'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var property = block.getFieldValue('PROPERTY');

    var code = varName + '.' + property;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['actor_get1'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var property = block.getFieldValue('PROPERTY');
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + '.' + property + '(' + arg1 + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['actor_set'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var property = block.getFieldValue('PROPERTY');
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + '.' + property + '=' + arg1 + ';';
    code += block.lineCode();
    return code;
};

Blockly.JavaScript['actor_set_custom'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var property = block.getFieldValue('PROPERTY');
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + '.' + property + '=' + arg1 + ';';
    code += block.lineCode();
    return code;
};

// methods
Blockly.JavaScript['actor_method0'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var method = block.getFieldValue('METHOD');

    var code = varName + '.' + method + ';';
    code += block.lineCode();
    return code;
};

Blockly.JavaScript['actor_method1'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var method = block.getFieldValue('METHOD');
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + '.' + method + '(' + arg1 + ');';
    code += block.lineCode();
    return code;
};


Blockly.JavaScript['actor_method2'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var method = block.getFieldValue('METHOD');
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);
    var arg2 = Blockly.JavaScript.valueToCode(block, 'ARG2', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + '.' + method.format(arg1, arg2) + ';\n';
    return code;
};

Blockly.JavaScript['loop_actors_at'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    code = 'for (let %1 of game4k.getObjectsAt(%2, %3, \'%1\')) {'.format(varName, x, y);
    code += block.lineCode();
    code += stmt;
    code += '}';
    code += block.lineCode();

    return code;
};