Blockly.JavaScript['create_sequence'] = function (block) {

    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);

    // depth
    Blockly.JavaScript.sequenceStack.push(Blockly.JavaScript.SEQ);
    Blockly.JavaScript.actorStack.push(varName);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
    Blockly.JavaScript.actorStack.pop();
    Blockly.JavaScript.sequenceStack.pop();

    var code = 'new Game4kids.Sequence(%1)\n'.format(varName);
    //code += stmt.split('\n').filter(stmt => stmt.contains('.addFactory')).join('\n');
    code += stmt;

    if (Arrays.getLast(Blockly.JavaScript.sequenceStack) == Blockly.JavaScript.SEQ) {
        code = '.addFactory(function () { return %1 })\n'.format(code);
    } else {
        code = '%1\n.start();\n'.format(code);
    }

    return code;
};

Blockly.JavaScript['sequence_statement'] = function (block) {

    Blockly.JavaScript.sequenceStack.push(Blockly.JavaScript.STMT);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
    Blockly.JavaScript.sequenceStack.pop();

    var code = stmt;

    if (Arrays.getLast(Blockly.JavaScript.sequenceStack) == Blockly.JavaScript.SEQ) {
        code = '.addFactory(function () { return new Game4kids.TweenExecutor(function () {\n%1}) })\n'.format(code);
    }

    return code;
};

Blockly.JavaScript['create_tween'] = function (block) {
    var next1 = Blockly.JavaScript.valueToCode(block, 'NEXT1', Blockly.JavaScript.ORDER_ATOMIC);
    /*var next2 = Blockly.JavaScript.valueToCode(block, 'NEXT2', Blockly.JavaScript.ORDER_ATOMIC);*/ // TODO
    var time = block.getFieldValue('TIME');

    var code = 'game4k.createTween(%1)'.format(Arrays.getLast(Blockly.JavaScript.actorStack));
    code += next1;
    code += '.animate(%1)'.format(time);

    if (Arrays.getLast(Blockly.JavaScript.sequenceStack) == Blockly.JavaScript.SEQ) {
        code = '.addFactory(function () { return %1 })\n'.format(code);
    } else {
        code = '%1.start();\n'.format(code);
    }

    return code;
};

Blockly.JavaScript['tween_to'] = function (block) {
    var property = block.getFieldValue('PROPERTY');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    var relative = block.getFieldValue('RELATIVE') == 'TRUE';

    var method = (relative) ? 'doRelative' : 'do';

    var code = '.%1(\'%2\', %3)'.format(method, property, value);

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['tween_combine'] = function (block) {
    var next1 = Blockly.JavaScript.valueToCode(block, 'NEXT1', Blockly.JavaScript.ORDER_ATOMIC);
    var next2 = Blockly.JavaScript.valueToCode(block, 'NEXT2', Blockly.JavaScript.ORDER_ATOMIC);

    var code = next1;
    code += next2;

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};