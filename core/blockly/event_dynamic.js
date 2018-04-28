// create namespate
Blockly.eventDynamic = Blockly.eventDynamic || {};

Blockly.eventDynamic.SIGNAL_CREATE_COLLIDE =
    '<block type="signal_create_collide"></block>';

Blockly.eventDynamic.SIGNAL_CREATE =
    '<block type="signal_create"></block>';

Blockly.eventDynamic.SIGNAL_DESTROY =
    '<block type="signal_destroy"></block>';

Blockly.eventDynamic.SIGNAL_PROPERTY =
    '<block type="signal_property"></block>';

Blockly.eventDynamic.SIGNAL_COMBINE =
    '<block type="signal_combine"></block>';

Blockly.eventDynamic.SIGNAL_IF =
    '<block type="signal_if">' +
    Blockly.dynamic.buildShadowBoolean('VALUE', 'TRUE') +
    '</block>';

Blockly.eventDynamic.SIGNAL_EVERY =
    '<block type="signal_every">' + 
    Blockly.dynamic.buildShadowNumber('VALUE', 0.75) +
    '</block>';

Blockly.eventDynamic.SIGNAL_MOUSE =
    '<block type="signal_mouse"></block>';

Blockly.eventDynamic.SIGNAL_KEYBOARD =
    '<block type="signal_keyboard"></block>';

Blockly.eventDynamic.SIGNAL_CREATE_COLLIDE =
    '<block type="signal_create_collide"></block>';

Blockly.eventDynamic.SIGNAL_COLLIDE =
    '<block type="signal_collide"></block>';

    /*
Blockly.eventDynamic.SIGNAL_WITH =
    '<block type="signal_with"></block>';
*/
Blockly.eventDynamic.eventFlyoutCallback = function (workspace) {

    var xmlList = [];

    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    // constructor
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_CONSTRUCTOR)));

    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_CREATE));

    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_DESTROY));

    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_PROPERTIES)));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_PROPERTY));

    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_OPERATOR)));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_COMBINE));

//Blockly.eventDynamic.SIGNAL_COUNT

    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_METHODS)));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_IF));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_EVERY));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_MOUSE));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_KEYBOARD));

    if (actorVariables.length > 0) {
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_COLLIDE));
        //xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_WITH));
    }

    if (actorVariables.length > 0) {
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_STATIC)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_CREATE_COLLIDE));
    }

    return xmlList;
};
