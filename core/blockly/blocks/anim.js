Blockly.Constants.Anim = Blockly.Constants.Anim || {
}

// constructor
Blockly.Blocks['create_sequence'] = {
    init: function () {
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_DURING)
        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.ANIM_TYPE)
            .appendField(Blockly.Msg.BLOCK_ANIMATE)
        this.appendStatementInput("STMT")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ANIM_HUE);
        this.setTooltip("");
        this.setHelpUrl("");

        Blockly.Extensions.apply('create_sequence_mutator', this, true);
    },
};

// mixin
Blockly.Blocks['create_sequence_sequence'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_THEN);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ANIM_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['create_sequence_then'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_THEN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.ANIM_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
        this.contextMenu = false;
    }
};

Blockly.Constants.Anim.CONTROLS_SEQUENCE_MUTATOR_MIXIN = {
    thenCount_: 0,

    mutationToDom: function () {
        if (!this.thenCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.thenCount_) {
            container.setAttribute('then', this.thenCount_);
        }
        return container;
    },
    domToMutation: function (xmlElement) {
        this.thenCount_ = parseInt(xmlElement.getAttribute('then'), 10) || 0;
        this.updateShape_();
    },
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('create_sequence_sequence');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.thenCount_; i++) {
            var thenBlock = workspace.newBlock('create_sequence_then');
            thenBlock.initSvg();
            connection.connect(thenBlock.previousConnection);
            connection = thenBlock.nextConnection;
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
        this.thenCount_ = 0;
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'create_sequence_then':
                    this.thenCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 1; i <= this.thenCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'TIME' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
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
                case 'create_sequence_then':
                    var inputTime = this.getInput('TIME' + i);
                    var inputDo = this.getInput('DO' + i);
                    clauseBlock.valueConnection_ =
                        inputTime && inputTime.connection.targetConnection;
                    clauseBlock.valueConnection_ =
                        inputNext && inputNext.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
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
        var i = 1;
        while (this.getInput('TIME' + i)) {
            this.getInputTargetBlock('TIME' + i).dispose();
            this.removeInput('TIME' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.thenCount_; i++) {
            this.appendValueInput('TIME' + i)
                .setCheck("Number")
                .appendField(Blockly.Msg.BLOCK_THEN)
                .appendField(Blockly.Msg.BLOCK_DURING)
            this.appendStatementInput('DO' + i)
                .appendField(Blockly.Msg.BLOCK_DO);

            Blockly.dynamic.connectToShadow(this, 'TIME' + i, 'math_number', 'NUM', 0.75);

        }
    }
};

Blockly.dynamic.connectToShadow = function (block, input, name, field, value) {
    var shadowBlock = block.workspace.newBlock(name);
    shadowBlock.setShadow(true);

    shadowBlock.initSvg();
    shadowBlock.render();
    if (field != undefined) {
        shadowBlock.setFieldValue(value, field);
    }

    block.getInput(input).connection.connect(shadowBlock.outputConnection);
}

Blockly.dynamic.connectToShadowNumber = function (block, input, value = 0) {
    var shadowBlock = block.workspace.newBlock('math_number');
    shadowBlock.setShadow(true);

    shadowBlock.initSvg();
    shadowBlock.render();
    shadowBlock.setFieldValue(value, 'NUM');

    block.getInput(input).connection.connect(shadowBlock.outputConnection);
}

Blockly.Extensions.registerMutator('create_sequence_mutator',
    Blockly.Constants.Anim.CONTROLS_SEQUENCE_MUTATOR_MIXIN, null,
    ['create_sequence_then']);




















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

Blockly.Blocks['sequence_once'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("once");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.ANIM_TYPE);
        this.setColour(Blockly.Msg.ANIM_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['sequence_always'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("forever");
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

Blockly.Blocks['sequence_do'] = {
    init: function () {
        this.OPTIONS = [
            ['wait', 'this.wait()'], // TODO : create wait
            ['destroy', 'this.destroy()'],
            ['pause', 'new Game4kids.TweenLock(game4k, this).start()'],
            ['resume', 'game4k.resume()'],
        ]

        this.appendDummyInput()
            .appendField("with animation")
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "METHOD")
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
        this.PROPERTIES = [
            ["x", "x"],
            ["y", "y"],
            [Blockly.Msg.BLOCK_ANGLE, "angle"],
            [Blockly.Msg.BLOCK_OPACITY, "opacity"],
            [Blockly.Msg.BLOCK_SCALE.format('x'), "scaleX"],
            [Blockly.Msg.BLOCK_SCALE.format('y'), "scaleY"],
        ];

        this.EASINGS = [
            ['linear', 'Phaser.Easing.Default'],
            ['accelerate', 'Phaser.Easing.Exponential.In'],
            ['decelerate', 'Phaser.Easing.Exponential.Out'],
            ['sin', 'Phaser.Easing.Sinusoidal.InOut'],
            ['circular', 'Phaser.Easing.Circular.InOut'],
            ['elastic', 'Phaser.Easing.Elastic.Out'],
            ['bounce', 'Phaser.Easing.Bounce.Out'],
            ['inertia', 'Phaser.Easing.Back.Out'],
        ]

        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("with")
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField("set")
            .appendField(new Blockly.FieldDropdown(this.PROPERTIES), "PROPERTY")
            .appendField("to")
        this.appendDummyInput()
            .appendField("relative")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "RELATIVE")
            .appendField("easing")
            .appendField(new Blockly.FieldDropdown(this.EASINGS), "EASING")
        /*this.appendValueInput("NEXT2")
            .setCheck(Blockly.Block.TWEEN_TYPE)*/ // TODO
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
