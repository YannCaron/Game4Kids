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
Blockly.Blocks['signal_if'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Boolean")
            .appendField("if");
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
        this.KEYS = [
            ["left", ".toEvent(function () { return game.input.activePointer.leftButton.isDown; })"],
            ["middle", ".toEvent(function () { return game.input.activePointer.middleButton.isDown; })"],
            ["right", ".toEvent(function () { return game.input.activePointer.rightButton.isDown; })"],
        ];

        this.EVENTS = [
            ['press', '.toggle().whenEquals(true)'],
            ['pressing', '.whenEquals(true)'],
            ['pressed', '.toggle().whenEquals(false)']
        ];

        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .appendField("mouse")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
            .appendField(new Blockly.FieldDropdown(this.EVENTS), "EVENT")
            .appendField("when →");
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_keyboard'] = {
    init: function () {
        this.KEYS = [
            ["← left", ".toEvent(function () { return game.input.keyboard.isDown(Phaser.Keyboard.LEFT); })"],
            ["→ right", ".toEvent(function () { return game.input.keyboard.isDown(Phaser.Keyboard.RIGHT); })"],
            ["↑ up", ".toEvent(function () { return game.input.keyboard.isDown(Phaser.Keyboard.UP); })"],
            ["↓ down", ".toEvent(function () { return game.input.keyboard.isDown(Phaser.Keyboard.DOWN); })"],
            ["↲ enter", ".toEvent(function () { return game.input.keyboard.isDown(Phaser.Keyboard.ENTER); })"],
            ["  space", ".toEvent(function () { return game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR); })"],
        ];
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < chars.length; i++) {
            this.KEYS.push([chars.charAt(i), '.toEvent(function () { return game.input.keyboard.isDown(Phaser.Keyboard.' + chars.charAt(i) + '); })']);
        }

        this.EVENTS = [
            ['press', '.toggle().whenEquals(true)'],
            ['pressing', '.whenEquals(true)'],
            ['pressed', '.toggle().whenEquals(false)']
        ];

        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .appendField("key")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
            .appendField(new Blockly.FieldDropdown(this.EVENTS), "EVENT")
            .appendField("when →");
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_collide'] = {
    init: function () {
        this.KEYS = [
            ["collide", ".toEvent(function () { return game.physics.arcade.collide(%1, %2); })"],
            ["overlap", ".toEvent(function () { return game.physics.arcade.overlap(%1, %2); })"],
        ];

        this.EVENTS = [
            ['enter', '.toggle().whenEquals(true)'],
            ['during', '.whenEquals(true)'],
            ['exit', '.toggle().whenEquals(false)']
        ];

        var actorVariables = this.workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);
        this.GROUPS = [];
        for (var v in actorVariables) {
            var variable = actorVariables[v];
            this.GROUPS.push(['all %1s'.format(variable.name), 'Game4kids.current.groups.get(\'%1\')'.format(variable.name)]);
        }

        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .appendField("on")
            .appendField(new Blockly.FieldDropdown(this.GROUPS), "ACTOR1")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
            .appendField(new Blockly.FieldDropdown(this.EVENTS), "EVENT")
            .appendField("with")
            .appendField(new Blockly.FieldDropdown(this.GROUPS.slice()), "ACTOR2")
            .appendField("when →");
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};