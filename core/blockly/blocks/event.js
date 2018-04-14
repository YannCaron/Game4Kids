// global
Blockly.Blocks.event = {};
Blockly.Blocks.event.HUE = Blockly.Msg.EVENT_HUE;


// constructor
Blockly.Blocks['signal_create'] = {
    init: function () {
        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .appendField("when →");
        this.appendStatementInput("STMT")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_create_with'] = {
    init: function () {
        this.appendValueInput("NEXT")
            .appendField("with")
            .appendField(this.fieldActorFactory(), "VAR")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .appendField("when →");
        this.appendStatementInput("STMT")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// operators
Blockly.Blocks['signal_combine'] = {
    init: function () {
        this.appendValueInput("NEXT1")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("combine");
        this.appendValueInput("NEXT2")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("with");
        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("when →");
        this.setInputsInline(false);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// methods
Blockly.Blocks['signal_every'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("every");
        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("when →");
        this.setInputsInline(false);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
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
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .appendField("mouse")
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "EVENT")
            .appendField("when →");
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


/*
    var key = [
      ["← left", "LEFT"], // ↺ ↻ found on https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Caract%C3%A8res_sp%C3%A9ciaux/Fl%C3%A8ches
      ["→ right", "RIGHT"],
      ["↑ up", "UP"],
      ["↓ down", "DOWN"],
      ["↲ enter", "ENTER"],
      ["  space", "SPACEBAR"]
    ];
*/