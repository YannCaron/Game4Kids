// constructor
Blockly.Blocks['create_actor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_CREATE)
            .appendField(this.fieldActorFactory(), "VAR");
        this.appendValueInput("IMG")
            .setCheck(Blockly.Block.IMAGE_TYPE)
            .appendField(Blockly.Msg.BLOCK_WITH)
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_X_TO);
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_Y_TO);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ACTOR_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_CREATE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['actor_object'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(this.fieldActorFactory(), "VAR");
        this.setOutput(true, Blockly.Block.ACTOR_TYPE);
        this.setColour(Blockly.Msg.ACTOR_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_OBJECT);
        this.setHelpUrl("");
    }
};

// properties
Blockly.Blocks['actor_get'] = {

    init: function () {
        this.OPTIONS = [
            ["x", "x"],
            ["y", "y"],
            [`${Blockly.Msg.BLOCK_VELOCITY} x`, "body.velocity.x"],
            [`${Blockly.Msg.BLOCK_VELOCITY} y`, "body.velocity.y"],
            [Blockly.Msg.BLOCK_ANGLE, "angle"],
        ];

        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck(Blockly.Block.ACTOR_TYPE)
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_GET)
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Msg.ACTOR_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_GET.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestActor);
    }

};

Blockly.Blocks['actor_set'] = {
    init: function () {
        this.OPTIONS = [
            ["x", "x = %1"],
            ["y", "y = %1"],
            [`${Blockly.Msg.BLOCK_VELOCITY} x`, "body.velocity.x = %1"],
            [`${Blockly.Msg.BLOCK_VELOCITY} y`, "body.velocity.y = %1"],
            [Blockly.Msg.BLOCK_VELOCITY_FROM_ANGLE, "setVelocityFromAngle(%1)"],
            [Blockly.Msg.BLOCK_GRAVITY, "setGravity(%1)"],
            [Blockly.Msg.BLOCK_ANGLE, "angle = %1"],
            [Blockly.Msg.BLOCK_OPACITY, "opacity = %1"],
            [Blockly.Msg.BLOCK_SCALE.format('x'), "scaleX = %1"],
            [Blockly.Msg.BLOCK_SCALE.format('y'), "scaleY = %1"],
            [Blockly.Msg.BLOCK_BOUNCE, "setBounce(%1)"],
            [Blockly.Msg.BLOCK_FRICTION, "setFriction(%1)"],
            [Blockly.Msg.BLOCK_MASS, "setMass(%1)"],
        ];

        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck(Blockly.Block.ACTOR_TYPE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_SET)
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.appendValueInput("ARG1")
            .appendField(Blockly.Msg.BLOCK_TO)
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ACTOR_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_SET.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestActor);
    }

};

Blockly.Blocks['actor_get1'] = {
    init: function () {
        this.OPTIONS = [
            [`${Blockly.Msg.BLOCK_ANGLE} ${Blockly.Msg.BLOCK_WITH}`, "getAngleWith"],
            [`${Blockly.Msg.BLOCK_DISTANCE} ${Blockly.Msg.BLOCK_WITH}`, "getDistanceWith"]
        ];

        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck(Blockly.Block.ACTOR_TYPE)
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_GET)
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.appendValueInput("ARG1")
            .setCheck(Blockly.Block.ACTOR_TYPE)
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Msg.ACTOR_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_GET.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestActor);
    }

};

// method
Blockly.Blocks['actor_method0'] = {
    init: function () {
        this.OPTIONS = [
            [Blockly.Msg.BLOCK_COLLIDE_BOUNDS, "body.collideWorldBounds = true"],
            [Blockly.Msg.BLOCK_IMMOVABLE, "body.immovable = true"],
            [Blockly.Msg.BLOCK_ROTATE_WHEN_COLLIDE, "rotateOnCollide()"],
            [Blockly.Msg.BLOCK_DESTROY, "kill()"],
        ];
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck(Blockly.Block.ACTOR_TYPE)
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "METHOD")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ACTOR_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_ACTION.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestActor);
    }
};

Blockly.Blocks['actor_method1'] = {
    init: function () {
        this.OPTIONS = [
            [Blockly.Msg.BLOCK_JUMP, "jump (%1)"],
            [Blockly.Msg.BLOCK_DISP_FOREWARD, "displaceForeward (%1)"],
            [Blockly.Msg.BLOCK_DISP_SIDEWAYS, "displaceSideways (%1)"],
        ];
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck(Blockly.Block.ACTOR_TYPE)
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "METHOD")
        this.appendValueInput("ARG1")
            .setCheck('Number')
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ACTOR_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_ACTION.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestActor);
    }
};
/*
Blockly.Blocks['actor_method2'] = {
    init: function () {
        this.OPTIONS = [
            ['Displace from angle', "diplaceFromAngle(%1, %2)"],
        ];

        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck(Blockly.Block.ACTOR_TYPE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "METHOD");
        this.appendValueInput("ARG1")
            .setCheck('Number')
        this.appendValueInput("ARG2")
            .setCheck('Number')
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ACTOR_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_ACTION.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestActor);

    }
};*/