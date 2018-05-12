Blockly.Blocks['variables_global'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField(Blockly.Msg.BLOCK_SET_GLOBAL)
            .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR")
            .appendField(Blockly.Msg.BLOCK_TO_VALUE)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.VARIABLES_HUE);
        this.setTooltip(Blockly.Msg.VARIABLES_GLOBAL_TOOLTIP);
        this.setHelpUrl("");
    }
};