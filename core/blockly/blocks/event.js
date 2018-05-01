Blockly.Blocks.event.COLLIDE_KEYS = function () {
    return [
        ["collide", "collide"],
        ["overlap", "overlap"],
    ];
}

Blockly.Blocks.event.SWITCH_EVENTS = function () {
    return [
        ['press', '.toggle().whenEquals(true)'],
        ['pressing', '.whenEquals(true)'],
        ['pressed', '.toggle().whenEquals(false).ignoreFirst()'],
        ['not pressing', '.whenEquals(false)']
    ];
}

Blockly.Blocks.event.CONTINUOUS_EVENTS = function () {
    return [
        ['enter', '.toggle().whenEquals(true)'],
        ['during', '.whenEquals(true)'],
        ['exit', '.toggle().whenEquals(false).ignoreFirst()'],
        ['hanging', '.whenEquals(false)']
    ];
}

// constructor
Blockly.Blocks['signal_create'] = {
    init: function () {
        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .appendField(Blockly.Msg.BLOCK_WITH)
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField(Blockly.Msg.BLOCK_WHEN);
        this.appendStatementInput("STMT")
            .appendField(Blockly.Msg.BLOCK_DO)
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_CREATE_WITH);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_destroy'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_DESTROY);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_DESTROY);
        this.setHelpUrl("");

    }
};

// TODO : translate from here

// operators
Blockly.Blocks['signal_combine'] = {
    init: function () {
        this.OPTIONS = [
            ['and', '%1%2'],
            ['or', '%1.combineWith(\ngame4k.createSignal()%2)'],
        ];

        this.appendValueInput("NEXT1")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .setAlign(Blockly.ALIGN_RIGHT)
        this.appendValueInput("NEXT2")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "OPERATOR");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// properties
Blockly.Blocks['signal_property'] = {
    init: function () {
        this.OPTIONS = [
            ['count', 'count'],
            ['duration', 'duration'],
            ['time', 'time']
        ];

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.setOutput(true, 'Number');
        this.setColour(Blockly.Msg.EVENT_HUE);
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
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_every'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("every");
        this.appendDummyInput()
            .appendField("seconds");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_mouse'] = {
    init: function () {
        this.KEYS = [
            ["left", ".map(function () { return game4k.game.input.activePointer.leftButton.isDown; })"],
            ["middle", ".map(function () { return game4k.game.input.activePointer.middleButton.isDown; })"],
            ["right", ".map(function () { return game4k.game.input.activePointer.rightButton.isDown; })"],
        ];

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.SWITCH_EVENTS()), "EVENT")
            .appendField("mouse")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_actor_mouse'] = {
    init: function () {
        this.KEYS = [
            ["drag", ".map(function () { return this.getRoot().actor.drag; })"],
            ["over", ".map(function () { return this.getRoot().actor.over; })"],
        ];

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.CONTINUOUS_EVENTS()), "EVENT")
            .appendField("mouse")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_keyboard'] = {
    init: function () {
        this.KEYS = [
            ["← left", ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.LEFT); })"],
            ["→ right", ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT); })"],
            ["↑ up", ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.UP); })"],
            ["↓ down", ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.DOWN); })"],
            ["↲ enter", ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.ENTER); })"],
            ["  space", ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR); })"],
        ];
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < chars.length; i++) {
            this.KEYS.push([chars.charAt(i), '.map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.' + chars.charAt(i) + '); })']);
        }

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.SWITCH_EVENTS), "EVENT")
            .appendField("key")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_collide'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.CONTINUOUS_EVENTS()), "EVENT")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_KEYS()), "KEY")
            .appendField("with")
            .appendField(this.fieldActorFactory(), "ACTOR");
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },

};

Blockly.Blocks['signal_collide_bounds'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.CONTINUOUS_EVENTS()), "EVENT")
            .appendField("collide bounds")
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },

};

Blockly.Blocks['signal_create_collide'] = {
    init: function () {
        this.EVENTS = [
            ['enter', '11'],
            ['during', '01'],
            ['exit', '10'],
        ];

        this.appendDummyInput()
            .appendField("when any")
            .appendField(this.fieldActorFactory(), "ACTOR1")
            .appendField(new Blockly.FieldDropdown(this.EVENTS), "EVENT")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_KEYS()), "KEY")
        this.appendDummyInput()
            .appendField("with any")
            .appendField(this.fieldActorFactory(), "ACTOR2");
        this.appendStatementInput("STMT")
            .setCheck(null)
            .appendField(Blockly.Msg.BLOCK_DO);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },

};