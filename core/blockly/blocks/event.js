Blockly.Blocks.event.COLLIDE_KEYS = function () {
    return [
        [Blockly.Msg.BLOCK_COLLIDE, "collide"],
        [Blockly.Msg.BLOCK_OVERLAP, "overlap"],
    ];
}

Blockly.Blocks.event.SWITCH_EVENTS = function () {
    return [
        [Blockly.Msg.BLOCK_PRESS, '.toggle().whenEquals(true)'],
        [Blockly.Msg.BLOCK_PRESSING, '.whenEquals(true)'],
        [Blockly.Msg.BLOCK_PRESSED, '.toggle().whenEquals(false).ignoreFirst()'],
        [Blockly.Msg.BLOCK_NOT_PRESSING, '.whenEquals(false)']
    ];
}

Blockly.Blocks.event.CONTINUOUS_EVENTS = function () {
    return [
        [Blockly.Msg.BLOCK_ENTER, '.toggle().whenEquals(true)'],
        [Blockly.Msg.BLOCK_DURING, '.whenEquals(true)'],
        [Blockly.Msg.BLOCK_EXIT, '.toggle().whenEquals(false).ignoreFirst()'],
        [Blockly.Msg.BLOCK_HANGING, '.whenEquals(false)']
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

// operators
Blockly.Blocks['signal_combine'] = {
    init: function () {
        this.OPTIONS = [
            [Blockly.Msg.BLOCK_AND, '%1%2'],
            [Blockly.Msg.BLOCK_OR, '%1.combineWith(\ngame4k.createSignal()%2)'],
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
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_COMBINE);
        this.setHelpUrl("");
    }
};

// properties
Blockly.Blocks['signal_property'] = {
    init: function () {
        this.OPTIONS = [
            [Blockly.Msg.BLOCK_COUNT, 'count'],
            [Blockly.Msg.BLOCK_TIME, 'lapse'],
            [Blockly.Msg.BLOCK_DURATION, 'duration'],
        ];

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.setOutput(true, 'Number');
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_PROPERTY.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");
    }
};

// methods
Blockly.Blocks['signal_if'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.BLOCK_IF);
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_IF);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_every'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_EVERY);
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_SECONDS);
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_EVERY);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_mouse'] = {
    init: function () {
        this.KEYS = [
            [Blockly.Msg.BLOCK_LEFT, ".map(function () { return game4k.game.input.activePointer.leftButton.isDown; })"],
            [Blockly.Msg.BLOCK_MIDDLE, ".map(function () { return game4k.game.input.activePointer.middleButton.isDown; })"],
            [Blockly.Msg.BLOCK_RIGHT, ".map(function () { return game4k.game.input.activePointer.rightButton.isDown; })"],
        ];

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.SWITCH_EVENTS()), "EVENT")
            .appendField(Blockly.Msg.BLOCK_MOUSE_BUTTON)
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_MOUSE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_actor_mouse'] = {
    init: function () {
        this.KEYS = [
            [Blockly.Msg.BLOCK_DRAG, ".map(function () { return this.getRoot().actor.drag; })"],
            [Blockly.Msg.BLOCK_OVER, ".map(function () { return this.getRoot().actor.over; })"],
        ];

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.CONTINUOUS_EVENTS()), "EVENT")
            .appendField(Blockly.Msg.BLOCK_MOUSE)
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_ACTOR_MOUSE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_keyboard'] = {
    init: function () {
        this.KEYS = [
            ["← %1".format(Blockly.Msg.BLOCK_LEFT), ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.LEFT); })"],
            ["→ %1".format(Blockly.Msg.BLOCK_RIGHT), ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT); })"],
            ["↑ %1".format(Blockly.Msg.BLOCK_UP), ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.UP); })"],
            ["↓ %1".format(Blockly.Msg.BLOCK_DOWN), ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.DOWN); })"],
            ["↲ %1".format(Blockly.Msg.BLOCK_RETURN), ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.ENTER); })"],
            ["  %1".format(Blockly.Msg.BLOCK_SPACE), ".map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR); })"],
        ];
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < chars.length; i++) {
            this.KEYS.push([chars.charAt(i), '.map(function () { return game4k.game.input.keyboard.isDown(Phaser.Keyboard.' + chars.charAt(i) + '); })']);
        }

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.SWITCH_EVENTS), "EVENT")
            .appendField(Blockly.Msg.BLOCK_KEY)
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_KEYBOARD);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_collide'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.CONTINUOUS_EVENTS()), "EVENT")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_KEYS()), "KEY")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .appendField(this.fieldActorFactory(), "ACTOR");
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_COLLIDE);
        this.setHelpUrl("");
    },

};

Blockly.Blocks['signal_collide_bounds'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.CONTINUOUS_EVENTS()), "EVENT")
            .appendField(Blockly.Msg.BLOCK_COLLIDE_BOUNDS_EVENT)
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_COLLIDE_BOUNDS);
        this.setHelpUrl("");
    },

};

Blockly.Blocks['signal_create_collide'] = {
    init: function () {
        this.EVENTS = [
            [Blockly.Msg.BLOCK_ENTER, '11'],
            [Blockly.Msg.BLOCK_DURING, '01'],
            [Blockly.Msg.BLOCK_EXIT, '10'],
        ];

        this.appendDummyInput()
            .appendField("%1 %2".format(Blockly.Msg.BLOCK_WHEN, Blockly.Msg.BLOCK_ANY))
            .appendField(this.fieldActorFactory(), "ACTOR1")
            .appendField(new Blockly.FieldDropdown(this.EVENTS), "EVENT")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_KEYS()), "KEY")
        this.appendDummyInput()
            .appendField("%1 %2".format(Blockly.Msg.BLOCK_WITH, Blockly.Msg.BLOCK_ANY))
            .appendField(this.fieldActorFactory(), "ACTOR2");
        this.appendStatementInput("STMT")
            .setCheck(null)
            .appendField(Blockly.Msg.BLOCK_DO);
        this.setColour(Blockly.Msg.EVENT_HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_CREATE_COLLIDE);
        this.setHelpUrl("");
    },

};
