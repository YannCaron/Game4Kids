// global
Blockly.Blocks.anim = {};
Blockly.Blocks.anim.HUE = Blockly.Msg.ANIM_HUE;

Blockly.Blocks['create_sequence'] = {
    init: function () {
        this.appendValueInput("NEXT")
            .setCheck("Anim")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField(Blockly.Block.SEQUENCE_TYPE);
        this.appendStatementInput("STMT")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.anim.HUE);
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

Blockly.Blocks['create_tween'] = {
    init: function () {
        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.TWEEN_TYPE)
            .appendField("animate")
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField(new Blockly.FieldNumber(1, 0, 60), "TIME")
            .appendField("second(s)");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
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
            [Blockly.Msg.BLOCK_SCALE, "scale"],
        ];

        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("property")
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.TWEEN_TYPE)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("relative")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "RELATIVE")
            .appendField("and");
        this.setInputsInline(false);
        this.setOutput(true, Blockly.Block.TWEEN_TYPE);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};