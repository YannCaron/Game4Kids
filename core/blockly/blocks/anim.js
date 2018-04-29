Blockly.Blocks['create_sequence'] = {
    init: function () {
        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.ANIM_TYPE)
            .appendField("animation of")
            .appendField(this.fieldActorFactory(), "VAR")
        this.appendStatementInput("STMT")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ANIM_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
        //this.setOnChange(this.onChanged);

    },
    /*
        onChanged: function (event) {
            if (this.getParent() && this.getParent().type == 'create_sequence'
                && this.getParent().getInput('STMT').connection.targetConnection
                && this.getParent().getInput('STMT').connection.targetConnection.sourceBlock_ == this) {
                this.setNextStatement(true, "Anim");
            } else {
                this.setNextStatement(true, null);
            }
        }*/
};

Blockly.Blocks['sequence_statement'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("then do");
        this.appendStatementInput("STMT")
            .setCheck(Blockly.Block.ANIM_TYPE);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ANIM_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['sequence_always'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("always");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.ANIM_TYPE);
        this.setColour(Blockly.Msg.ANIM_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['sequence_loop'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("loop");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.ANIM_TYPE);
        this.setColour(Blockly.Msg.ANIM_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['sequence_while'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Boolean")
            .appendField("while");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.ANIM_TYPE);
        this.setColour(Blockly.Msg.ANIM_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['sequence_destroy'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("destroy");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ANIM_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['create_tween'] = {
    init: function () {
        this.OPTIONS = [
            ['linear', 'Phaser.Easing.Default'],
            ['accelerate', 'Phaser.Easing.Exponential.In'],
            ['decelerate', 'Phaser.Easing.Exponential.Out'],
            ['sin', 'Phaser.Easing.Sinusoidal.InOut'],
            ['circular', 'Phaser.Easing.Circular.InOut'],
            ['elastic', 'Phaser.Easing.Elastic.Out'],
            ['bounce', 'Phaser.Easing.Bounce.Out'],
            ['inertia', 'Phaser.Easing.Back.Out'],
        ]

        this.appendValueInput("NEXT1")
            .setCheck(Blockly.Block.TWEEN_TYPE)
            .appendField("during")
            .appendField(new Blockly.FieldNumber(1, 0, 60), "TIME")
            .appendField("seconds with easing")
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "EASING")

        /*this.appendValueInput("NEXT2")
            .setCheck(Blockly.Block.TWEEN_TYPE)*/ // TODO
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['tween_to'] = {
    init: function () {
        this.OPTIONS = [
            ["x", "x"],
            ["y", "y"],
            [Blockly.Msg.BLOCK_ANGLE, "angle"],
            [Blockly.Msg.BLOCK_SCALE.format('x'), "scaleX"],
            [Blockly.Msg.BLOCK_SCALE.format('y'), "scaleY"],
        ];

        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("set")
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY")
            .appendField("to")
        this.appendDummyInput()
            .appendField("relative")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "RELATIVE")
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.TWEEN_TYPE);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['tween_combine'] = {
    init: function () {
        this.appendValueInput("NEXT1")
            .setCheck(Blockly.Block.TWEEN_TYPE)
        this.appendValueInput("NEXT2")
            .setCheck(Blockly.Block.TWEEN_TYPE)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("and");
        this.setInputsInline(false);
        this.setOutput(true, Blockly.Block.TWEEN_TYPE);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
