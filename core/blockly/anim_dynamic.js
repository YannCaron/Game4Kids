// create namespate
Blockly.animDynamic = Blockly.animDynamic || {};

Blockly.animDynamic.CREATE_TWEEN =
    '<block type="create_tween">' +
    Blockly.dynamic.buildShadowNumber('VALUE', 100) +
    Blockly.dynamic.buildShadowNumber('TIME', 0.75) +
    '</block>';

Blockly.animDynamic.CREATE_TWEEN_APPLY =
    '<block type="create_tween_apply">' +
    Blockly.dynamic.buildShadowNumber('VALUE', 100) +
    Blockly.dynamic.buildShadowNumber('TIME', 0.75) +
    '</block>';

Blockly.animDynamic.CREATE_TWEEN_SAY =
    '<block type="create_tween_say">' +
    Blockly.dynamic.buildShadowText('VALUE', '') +
    Blockly.dynamic.buildShadow('TIME', 'tween_auto', 0) +
    '</block>';

Blockly.animDynamic.CREATE_TWEEN_ASK_KEY =
    '<block type="create_tween_ask_key">' +
    Blockly.dynamic.buildShadowText('VALUE', '') +
    '</block>';

Blockly.animDynamic.TWEEN_RELATIVE =
    '<block type="tween_relative">' +
    Blockly.dynamic.buildShadowNumber('VALUE', 100) +
    '</block>';

Blockly.animDynamic.TWEEN_WAIT =
    '<block type="tween_wait">' +
    Blockly.dynamic.buildShadowNumber('TIME', 0.75) +
    '</block>';

Blockly.animDynamic.CREATE_SEQUENCE =
    '<block type="create_sequence">' +
    Blockly.dynamic.buildShadow('NEXT', 'sequence_once', '') +
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

Blockly.animDynamic.animFlyoutCallback = function (workspace) {

    var xmlList = [];

    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    if (actorVariables.length > 0) {
        // animation
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_ANIMATION)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.CREATE_TWEEN));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.TWEEN_RELATIVE));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.CREATE_TWEEN_APPLY));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.CREATE_TWEEN_SAY));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.CREATE_TWEEN_ASK_KEY));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.TWEEN_WAIT));

        // sequence
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_SEQUENCE)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.CREATE_SEQUENCE));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.SEQUENCE_ALWAYS));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.SEQUENCE_LOOP));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.SEQUENCE_WHILE));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.SEQUENCE_DO));
    }


    return xmlList;
};

Blockly.actorDynamic.createActorCallback = function (button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, Blockly.Block.ACTOR_TYPE);
};
