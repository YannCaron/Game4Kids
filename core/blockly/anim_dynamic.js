// create namespate
Blockly.animDynamic = Blockly.animDynamic || {};

Blockly.animDynamic.CREATE_SEQUENCE =
    '<block type="create_sequence">' +
    '</block>';

Blockly.animDynamic.CREATE_TWEEN =
    '<block type="create_tween">' +
    '</block>';

Blockly.animDynamic.TWEEN_TO =
    '<block type="tween_to">' +
    Blockly.dynamic.buildShadowNumber('VALUE', 100) +
    '</block>';

Blockly.animDynamic.animFlyoutCallback = function (workspace) {

    var xmlList = [];

    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    if (actorVariables.length > 0) {
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_CONSTRUCTOR)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.CREATE_SEQUENCE));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.CREATE_TWEEN));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.animDynamic.TWEEN_TO));

        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_PROPERTIES)));

        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_METHODS)));
    }


    return xmlList;
};

Blockly.actorDynamic.createActorCallback = function (button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, Blockly.Block.ACTOR_TYPE);
};
