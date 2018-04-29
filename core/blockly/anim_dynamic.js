// create namespate
Blockly.animDynamic = Blockly.animDynamic || {};

Blockly.animDynamic.CREATE_SEQUENCE =
    '<block type="create_sequence">' +
    '</block>';

Blockly.animDynamic.SEQUENCE_STATEMENT =
    '<block type="sequence_statement">' +
    '</block>';

Blockly.animDynamic.SEQUENCE_ALWAYS =
    '<block type="sequence_always">' +
    '</block>';

Blockly.animDynamic.SEQUENCE_LOOP =
    '<block type="sequence_loop">' +
    Blockly.dynamic.buildShadowNumber('VALUE', 5) +
    '</block>';

Blockly.animDynamic.SEQUENCE_WHILE =
    '<block type="sequence_while">' +
    Blockly.dynamic.buildShadowBoolean('VALUE', 'TRUE') +
    '</block>';

Blockly.animDynamic.SEQUENCE_DO =
    '<block type="sequence_do">' +
    '</block>';

Blockly.animDynamic.CREATE_TWEEN =
    '<block type="create_tween">' +
    Blockly.dynamic.buildShadowNumber('TIME', 0.75) +
    '</block>';

Blockly.animDynamic.TWEEN_TO =
    '<block type="tween_to">' +
    Blockly.dynamic.buildShadowNumber('VALUE', 100) +
    '</block>';

Blockly.animDynamic.TWEEN_COMBINE =
    '<block type="tween_combine">' +
    '</block>';

Blockly.animDynamic.TWEEN_WAIT =
    '<block type="tween_wait">' +
    Blockly.dynamic.buildShadowNumber('TIME', 0.75) +
    '</block>';

Blockly.animDynamic.animFlyoutCallback = function (workspace) {

    var xmlList = [];

    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    if (actorVariables.length > 0) {
        // sequence
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_SEQUENCE)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.CREATE_SEQUENCE));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.SEQUENCE_ALWAYS));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.SEQUENCE_LOOP));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.SEQUENCE_WHILE));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.SEQUENCE_STATEMENT));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.SEQUENCE_DO));

        // animation
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_ANIMATION)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.CREATE_TWEEN));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.TWEEN_TO));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.TWEEN_COMBINE));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.TWEEN_WAIT));
    }


    return xmlList;
};

Blockly.actorDynamic.createActorCallback = function (button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, Blockly.Block.ACTOR_TYPE);
};
