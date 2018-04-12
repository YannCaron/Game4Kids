// global
Blockly.Blocks.event = {};
Blockly.Blocks.event.HUE = Blockly.Msg.EVENT_HUE;


// constructor
Blockly.Blocks['signal_create'] = {
    init: function () {
        this.appendValueInput("NEXT")
            .setCheck("SIGNAL")
            .appendField("when");
        this.appendStatementInput("STMT")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// mutators
Blockly.Blocks['signal_every'] = {
    init: function () {
        this.appendValueInput("NEXT")
            .setCheck("SIGNAL")
            .appendField("every")
            .appendField(new Blockly.FieldNumber(0.75, 0, 60, 0.01), "VALUE")
            .appendField("seconds");
        this.setOutput(true, "SIGNAL");
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_mouse'] = {
    init: function () {
        this.OPTIONS = [
            ["left press enter", ".toEvent(function () { return game.input.activePointer.leftButton.isDown; }).toggle().whenEquals(true)"],
            ["left press", ".toEvent(function () { return game.input.activePointer.leftButton.isDown; }).whenEquals(true)"],
            ["left press exit", ".toEvent(function () { return game.input.activePointer.leftButton.isDown; }).toggle().whenEquals(false)"],
        ];

        this.appendValueInput("NEXT")
            .setCheck("SIGNAL")
            .appendField("Mouse")
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "EVENT");
        this.setOutput(true, "SIGNAL");
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};