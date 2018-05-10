// blocks
Blockly.JavaScript['create_tween'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var property = block.getFieldValue('PROPERTY');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    var time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var easing = block.getFieldValue('EASING');

    var valueType = block.getInputTargetBlock('VALUE').type;
    var doFunction = '.doTarget (\'%1\', function () { return %2; })';
    if (valueType == 'tween_relative') {
        doFunction = '.doRelative (\'%1\', %2)';
    } else if (valueType == 'math_number') {
        doFunction = '.do (\'%1\', %2)';
    }

    var code = 'game4k.createTween(%1, this)'.format(varName);
    code += doFunction.format(property, value);
    code += '.animate(%1).easing(%2).start();'.format(time, easing);
    code += block.lineCode();

    return code;
};

Blockly.JavaScript['create_tween_apply'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var property = block.getFieldValue('PROPERTY');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    var time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'game4k.createTween(%1, this)'.format(varName);
    code += '.apply (function () { %1.%2=%3; }, function () { %1.%2=0; })'.format(varName, property, value);
    code += '.animate(%1).start();'.format(time);
    code += block.lineCode();

    return code;
};

Blockly.JavaScript['tween_relative'] = function (block) {
    var sign = block.getFieldValue('SIGN');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);

    var code = "%1%2".format(sign, value);
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['tween_wait'] = function (block) {
    var time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'game4k.createTween(game4k.game, this).animate(%1).start();'.format(time);
    code += block.lineCode();

    return code;
};

Blockly.JavaScript['create_sequence'] = function (block) {
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'new Game4kids.Sequence(this)%1'.format(next);
    code += block.lineCode();

    var n = 0;
    do {

        // depth
        Blockly.JavaScript.sequenceStack.push(Blockly.JavaScript.SEQ);
        var stmt = Blockly.JavaScript.statementToCode(block, 'STMT' + n);
        Blockly.JavaScript.sequenceStack.pop();

        code += '.addFactory(function () { return new Game4kids.TweenExecutor(function () {'
        code += block.lineCode();
        code += 'try {\n'
        code += stmt
        code += '} catch (err) { game4k.manageError(err); }\n'
        code += '}, this) })\n';

        n++;
    } while (block.getInput('STMT' + n));
    code += '.start();';

    return code;
};

Blockly.JavaScript['sequence_once'] = function (block) {
    return ['', Blockly.JavaScript.ORDER_ATOMIC];
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

Blockly.JavaScript['sequence_do'] = function (block) {
    var method = block.getFieldValue('METHOD');

    var code = '%1;'.format(method);
    code += block.lineCode();
    return code;
};
