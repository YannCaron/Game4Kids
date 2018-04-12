// create namespate
Blockly.eventDynamic = Blockly.eventDynamic || {};

Blockly.eventDynamic.SIGNAL_CREATE =
    '<block type="signal_create"></block>';

Blockly.eventDynamic.SIGNAL_CREATE_WITH =
    '<block type="signal_create_with"></block>';

Blockly.eventDynamic.SIGNAL_EVERY =
    '<block type="signal_every">' + 
    Blockly.dynamic.buildShadowNumber('VALUE', 0.75) +
    '</block>';

Blockly.eventDynamic.SIGNAL_MOUSE =
    '<block type="signal_mouse"></block>';

Blockly.eventDynamic.actorFlyoutCallback = function (workspace) {

    var xmlList = [];

    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    // constructor
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_CONSTRUCTOR)));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_CREATE));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_CREATE_WITH));
    
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_METHODS)));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_EVERY));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_MOUSE));

    if (actorVariables.length > 0) {
	}


    return xmlList;
};
