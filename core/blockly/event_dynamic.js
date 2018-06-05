/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

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

Blockly.eventDynamic.SIGNAL_ACTOR_MOUSE =
    '<block type="signal_actor_mouse"></block>';

Blockly.eventDynamic.SIGNAL_MOUSE =
    '<block type="signal_mouse"></block>';

Blockly.eventDynamic.SIGNAL_KEYBOARD =
    '<block type="signal_keyboard"></block>';

Blockly.eventDynamic.SIGNAL_CREATE_COLLIDE =
    '<block type="signal_create_collide"></block>';

Blockly.eventDynamic.SIGNAL_COLLIDE_BOUNDS =
    '<block type="signal_collide_bounds"></block>';

Blockly.eventDynamic.SIGNAL_COLLIDE =
    '<block type="signal_collide"></block>';

Blockly.eventDynamic.eventFlyoutCallback = function (workspace) {

    var xmlList = [];

    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    if (actorVariables.length > 0) {
        // constructor
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_CONSTRUCTOR)));

        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_CREATE));

        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_DESTROY));

        // property
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_PROPERTIES)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_PROPERTY));

        // operator
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_OPERATOR)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_COMBINE));

        // methods
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_METHODS)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_IF));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_EVERY));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_MOUSE));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_ACTOR_MOUSE));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_KEYBOARD));

        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_COLLIDE));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_COLLIDE_BOUNDS));

        // static
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_STATIC)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.eventDynamic.SIGNAL_CREATE_COLLIDE));
    }

    return xmlList;
};
