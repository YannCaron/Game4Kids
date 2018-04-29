Blockly.JavaScript['create_sequence'] = function (block) {

    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);

    // depth
    Blockly.JavaScript.sequenceStack.push(Blockly.JavaScript.SEQ);
    Blockly.JavaScript.actorStack.push(varName);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
    Blockly.JavaScript.actorStack.pop();
    Blockly.JavaScript.sequenceStack.pop();

    var code = 'new Game4kids.Sequence(%1, this)%2'.format(varName, next);
    code += block.lineCode();
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

    var code = '';

    if (Arrays.getLast(Blockly.JavaScript.sequenceStack) == Blockly.JavaScript.SEQ) {
        code = '.addFactory(function () { return new Game4kids.TweenExecutor(function () {'
        code += block.lineCode();
        code += 'try {\n'
        code += stmt
        code += '} catch (err) { game4k.manageError(err); }\n'
        code += '}, this) })\n';
    } else {
        code = stmt;
    }

    return code;
};

Blockly.JavaScript['sequence_always'] = function (block) {
    var code = '.repeat(-1)';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sequence_loop'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = '.repeat(%1)'.format(value - 1);

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sequence_while'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = '.repeat(function () { return %1; })'.format(value);

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sequence_destroy'] = function (block) {
    var code = 'this.destroy();';
    code += block.lineCode();
    return code;
};

Blockly.JavaScript['create_tween'] = function (block) {
    var next1 = Blockly.JavaScript.valueToCode(block, 'NEXT1', Blockly.JavaScript.ORDER_ATOMIC);
    /*var next2 = Blockly.JavaScript.valueToCode(block, 'NEXT2', Blockly.JavaScript.ORDER_ATOMIC);*/ // TODO
    var time = block.getFieldValue('TIME');

    var code = 'game4k.createTween(%1, this)'.format(Arrays.getLast(Blockly.JavaScript.actorStack));
    code += next1;
    code += '.animate(%1)'.format(time);

    if (Arrays.getLast(Blockly.JavaScript.sequenceStack) == Blockly.JavaScript.SEQ) {
        code = '.addFactory(function () { return %1 })'.format(code);
    } else {
        code = '%1.start();'.format(code);
    }
    
    code += block.lineCode();

    return code;
};

Blockly.JavaScript['tween_to'] = function (block) {
    var property = block.getFieldValue('PROPERTY');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    var relative = block.getFieldValue('RELATIVE') == 'TRUE';

    var target = block.getInputTargetBlock('VALUE').type != 'math_number';

    var method = (relative) ? 'doRelative' : (target) ? 'doTarget' : 'do';
    if (target) value = 'function() { return %1;}'.format(value);

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