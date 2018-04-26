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
            .appendField(Blockly.Msg.BLOCK_WITH)
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField(Blockly.Msg.BLOCK_WHEN);
        this.appendStatementInput("STMT")
            .appendField(Blockly.Msg.BLOCK_DO)
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.event.HUE);
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

// properties
Blockly.Blocks['signal_property'] = {
    init: function () {
        this.OPTIONS = [
            ['count', 'count'],
            ['lapse', 'lapse'],
            ['duration', 'duration'],
        ];

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.setOutput(true, 'Number');
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
            .appendField(new Blockly.FieldDropdown(this.EVENTS), "EVENT")
            .appendField("mouse")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
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
            .appendField(new Blockly.FieldDropdown(this.EVENTS), "EVENT")
            .appendField("key")
            .appendField(new Blockly.FieldDropdown(this.KEYS), "KEY")
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
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_EVENTS()), "EVENT")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_KEYS()), "KEY")
            .appendField("with")
            .appendField(this.fieldActorFactory(), "ACTOR");
        this.setOutput(true, Blockly.Block.SIGNAL_TYPE);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    getActors: function () {
        var actors = [];
        actors.push(Blockly.JavaScript.variableDB_.getName(this.getFieldValue('ACTOR1'), Blockly.Variables.NAME_TYPE));
        actors.push(Blockly.JavaScript.variableDB_.getName(this.getFieldValue('ACTOR2'), Blockly.Variables.NAME_TYPE));
        return actors;
    }

};

Blockly.Blocks['signal_create_collide'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when any")
            .appendField(this.fieldActorFactory(), "ACTOR1")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_EVENTS()), "EVENT")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.event.COLLIDE_KEYS()), "KEY")
        this.appendDummyInput()
            .appendField("with any")
            .appendField(this.fieldActorFactory(), "ACTOR2");
        this.appendStatementInput("STMT")
            .setCheck(null)
            .appendField(Blockly.Msg.BLOCK_DO);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },

};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "signal_sequence",
        "message0": "with %1 %2 %3",
        "args0": [
            {
                "type": "field_variable",
                "name": "NAME",
                "variable": "item"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "NAME"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": "",
        "mutator": "signal_sequence_mutator",
    }
]);

Blockly.defineBlocksWithJsonArray([
    {
        "type": "mutator_sequence_then",
        "message0": "then",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "mutator_sequence_loop",
        "message0": "loop",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);

Blockly.Constants.Logic.SIGNAL_SEQUENCE_MUTATOR_MIXIN = {
    elseifCount_: 0,
    elseCount_: 0,

    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('controls_if_if');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock('controls_if_elseif');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock('controls_if_else');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    this.elseifCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case 'controls_if_else':
                    this.elseCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    var inputIf = this.getInput('IF' + i);
                    var inputDo = this.getInput('DO' + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                case 'controls_if_else':
                    var inputDo = this.getInput('ELSE');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            this.removeInput('IF' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput('IF' + i)
                .setCheck('Boolean')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
            this.appendStatementInput('DO' + i)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        }
    }
};

Blockly.Extensions.registerMutator('signal_sequence_mutator',
    Blockly.Constants.Logic.SIGNAL_SEQUENCE_MUTATOR_MIXIN, null,
    ['mutator_sequence_then', 'mutator_sequence_loop']);