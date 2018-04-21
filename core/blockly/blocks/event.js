// global
Blockly.Blocks.event = {};
Blockly.Blocks.event.HUE = Blockly.Msg.EVENT_HUE;

Blockly.Blocks.event.COLLIDE_KEYS = function () {
    return [
        ["collide", "collide"],
        ["overlap", "overlap"],
    ];
}

Blockly.Blocks.event.COLLIDE_EVENTS = function () {
    return [
        ['enter', '.toggle().whenEquals(true)'],
        ['during', '.whenEquals(true)'],
        ['exit', '.toggle().whenEquals(false)'],
        ['hanging', '.whenEquals(false)']
    ];
}

// constructor
Blockly.Blocks['signal_create'] = {
    init: function () {
        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.SIGNAL_TYPE)
            .appendField(Blockly.Msg.BLOCK_WHEN);
        this.appendStatementInput("STMT")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_SIGNAL_CREATE_WITH);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_create_collide'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when all")
            .appendField(this.fieldActorFactory(), "ACTOR1")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_KEYS()), "KEY")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_EVENTS()), "EVENT")
            .appendField("with all")
            .appendField(this.fieldActorFactory(), "ACTOR2");
        this.appendStatementInput("STMT")
            .setCheck(null);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    /*
    // Not for collisions
    getActors: function () {
        var actors = [];
        actors.push(Blockly.JavaScript.variableDB_.getName(this.getFieldValue('ACTOR1'), Blockly.Variables.NAME_TYPE));
        actors.push(Blockly.JavaScript.variableDB_.getName(this.getFieldValue('ACTOR2'), Blockly.Variables.NAME_TYPE));
        return actors;
    }*/

};

Blockly.Blocks['signal_destroy'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_DESTROY);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.event.HUE);
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
        this.setInputsInline(true);
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
        this.appendDummyInput()
            .appendField("seconds");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
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

        this.EVENTS = [
            ['press', '.toggle().whenEquals(true)'],
            ['pressing', '.whenEquals(true)'],
            ['pressed', '.toggle().whenEquals(false)'],
            ['not pressing', '.whenEquals(false)']
        ];

        this.appendDummyInput()
            .appendField("mouse")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
            .appendField(new Blockly.FieldDropdown(this.EVENTS), "EVENT")
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
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

        this.EVENTS = [
            ['press', '.toggle().whenEquals(true)'],
            ['pressing', '.whenEquals(true)'],
            ['pressed', '.toggle().whenEquals(false)'],
            ['not pressing', '.whenEquals(false)']
        ];

        this.appendDummyInput()
            .appendField("key")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
            .appendField(new Blockly.FieldDropdown(this.EVENTS), "EVENT")
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['signal_collide'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(this.fieldActorFactory(), "ACTOR1")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_KEYS()), "KEY")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_EVENTS()), "EVENT")
            .appendField("with")
            .appendField(this.fieldActorFactory(), "ACTOR2");
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    /*
    // Not for collisions
    getActors: function () {
        var actors = [];
        actors.push(Blockly.JavaScript.variableDB_.getName(this.getFieldValue('ACTOR1'), Blockly.Variables.NAME_TYPE));
        actors.push(Blockly.JavaScript.variableDB_.getName(this.getFieldValue('ACTOR2'), Blockly.Variables.NAME_TYPE));
        return actors;
    }*/

};

/*
Blockly.Blocks['signal_with'] = {
    init: function () {
        this.KEYS = [
            ["touche down", ".map(function () { return %1.body.touching.down })"],
        ];

        this.EVENTS = [
            ['enter', '.toggle().whenEquals(true)'],
            ['during', '.whenEquals(true)'],
            ['exit', '.toggle().whenEquals(false)'],
            ['hanging', '.whenEquals(false)']
        ];

        this.appendDummyInput()
            .appendField("with")
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
            .appendField(new Blockly.FieldDropdown(this.EVENTS), "EVENT")
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
*/