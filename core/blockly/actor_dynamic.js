// create namespate
Blockly.actorDynamic = Blockly.actorDynamic || {};

Blockly.actorDynamic.BUTTON_CREATE = 
    '<button text="Create actor..." callbackKey="createActorButtonPressed"></button>';

Blockly.actorDynamic.CREATE_ACTOR =
    '<block type="create_actor">' +
	Blockly.dynamic.buildShadowImage('IMG') +
	Blockly.dynamic.buildShadowNumber('X', 100) +
	Blockly.dynamic.buildShadowNumber('Y', 100) +
    '</block>';

Blockly.actorDynamic.ACTOR_OBJECT =
	'<block type="actor_object"></block>';

Blockly.actorDynamic.ACTOR_GET = 
	'<block type="actor_get">' + 
	Blockly.dynamic.buildShadowObject('VAR') +
	'</block>';

Blockly.actorDynamic.ACTOR_GET_CUSTOM =
	'<block type="actor_get_custom">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	'</block>';

Blockly.actorDynamic.ACTOR_GET_1 =
	'<block type="actor_get1">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowObject('ARG1') +
	'</block>';

Blockly.actorDynamic.ACTOR_SET =
	'<block type="actor_set">' + 
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowNumber('ARG1', 100) +
	'</block>';

Blockly.actorDynamic.ACTOR_SET_CUSTOM =
	'<block type="actor_set_custom">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowNumber('ARG1', 0) +
	'</block>';

Blockly.actorDynamic.ACTOR_METHOD0 =
	'<block type="actor_method0">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	'</block>';

Blockly.actorDynamic.ACTOR_METHOD1 =
	'<block type="actor_method1">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowNumber('ARG1', 100) +
	'</block>';

Blockly.actorDynamic.ACTOR_METHOD_WITH =
	'<block type="actor_method_with">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowObject('ARG1') +
	'</block>';

	/*
Blockly.actorDynamic.ACTOR_METHOD2 =
	'<block type="actor_method1">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowNumber('ARG1', 100) +
	Blockly.dynamic.buildShadowNumber('ARG2', 100) +
	'</block>';
*/
Blockly.actorDynamic.actorFlyoutCallback = function (workspace) {

    var xmlList = [];

    xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.BUTTON_CREATE));
    workspace.registerButtonCallback('createActorButtonPressed', Blockly.actorDynamic.createActorCallback);

    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    if (actorVariables.length > 0) {
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_CONSTRUCTOR)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.CREATE_ACTOR));

		xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_PROPERTIES)));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_OBJECT));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_GET));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_GET_CUSTOM));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_GET_1));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_SET));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_SET_CUSTOM));
        
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_METHODS)));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_METHOD0));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_METHOD1));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_METHOD_WITH));
		//xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_METHOD2));

		//xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_EVENTS)));
    }


    return xmlList;
};

Blockly.actorDynamic.createActorCallback = function (button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, Blockly.Block.ACTOR_TYPE);
};
