/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// Tween
// Tween.constructor
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
            .setCheck(["Number", Blockly.Block.RELATIVE_TYPE])
            .appendField(Blockly.Msg.BLOCK_WITH)
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField("set")
            .appendField(new Blockly.FieldDropdown(this.PROPERTIES), "PROPERTY")
            .appendField("to")
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_DURING)
        this.appendDummyInput()
            .appendField("easing")
            .appendField(new Blockly.FieldDropdown(this.EASINGS), "EASING")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['create_tween_apply'] = {
    init: function () {
        this.PROPERTIES = [
            ["← → horizontally", "body.velocity.x"],
            ["↑ ↓ vertically", "body.velocity.y"],
        ];

        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField("move")
            .appendField(new Blockly.FieldDropdown(this.PROPERTIES), "PROPERTY")
            .appendField("to")
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_DURING)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['tween_auto'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("auto");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.ANIM_TIME_TYPE);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['create_tween_say'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(["String", "Array"])
            .appendField(Blockly.Msg.BLOCK_WITH)
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField("say")
        this.appendValueInput("TIME")
            .setCheck(["Number", Blockly.Block.ANIM_TIME_TYPE])
            .appendField(Blockly.Msg.BLOCK_DURING)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['create_tween_ask_key'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(["String", "Array"])
            .appendField(Blockly.Msg.BLOCK_WITH)
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField("ask")
        this.appendDummyInput()
            .appendField("and wait a key");
        this.appendStatementInput("STMT")
            .setCheck(null)
            .appendField(new Blockly.FieldVariable("key"), "KEY");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['create_tween_ask_buttons'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(["String", "Array"])
            .appendField(Blockly.Msg.BLOCK_WITH)
            .appendField(this.fieldActorFactory(), "VAR")
            .appendField("ask")
        this.appendStatementInput("STMT0")
            .setCheck(null)
            .appendField(new Blockly.FieldTextInput("yes"), "BUTTON0");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");

        Blockly.Extensions.apply('create_tween_ask_mutator', this, true);

    }
};

// Sequence.mutator
new Blockly.MutatorBuilder('create_tween_ask_ask')
    .addMixin('create_tween_ask_answer', ['BUTTON', 'STMT'],
        (block, i) => {
            block.appendStatementInput("STMT" + i)
                .setCheck(null)
                .appendField(new Blockly.FieldTextInput(""), "BUTTON" + i);
        })
    .register('create_tween_ask_mutator');


// Sequence.mixin
Blockly.Blocks['create_tween_ask_ask'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("ask");
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['create_tween_ask_answer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("answer");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
        this.contextMenu = false;
    }
};

// Tween.attribute
Blockly.Blocks['tween_relative'] = {
    init: function () {
        this.SIGN = [
            ["+", "+"],
            ["-", "-"],
        ];

        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown(this.SIGN), "SIGN");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Block.RELATIVE_TYPE);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// Tween.method
Blockly.Blocks['tween_wait'] = {
    init: function () {
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField("wait");
        this.appendDummyInput()
            .appendField("seconds");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.TWEEN_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// Sequence
// Sequence.constructor
Blockly.Blocks['create_sequence'] = {
    init: function () {
        this.appendValueInput("NEXT")
            .setCheck(Blockly.Block.ANIM_TYPE)
            .appendField(Blockly.Msg.BLOCK_ANIMATE)
        this.appendStatementInput("STMT0")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.SEQUENCE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");

        Blockly.Extensions.apply('create_sequence_mutator', this, true);
    },
};

// Sequence.mutator
new Blockly.MutatorBuilder('create_sequence_sequence')
    .addMixin('create_sequence_then', ['THEN', 'STMT'],
        (block, i) => {
            block.appendDummyInput('THEN' + i)
                .appendField('then animate')
            block.appendStatementInput('STMT' + i)
                .appendField(Blockly.Msg.BLOCK_DO);
        })
    .register('create_sequence_mutator');


// Sequence.mixin
Blockly.Blocks['create_sequence_sequence'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_ANIMATE);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.SEQUENCE_HUE);
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
        this.setColour(Blockly.Msg.SEQUENCE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
        this.contextMenu = false;
    }
};

// Sequence.attributes
Blockly.Blocks['sequence_statement'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("then do");
        this.appendStatementInput("STMT")
            .setCheck(Blockly.Block.ANIM_TYPE);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.SEQUENCE_HUE);
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
        this.setColour(Blockly.Msg.SEQUENCE_HUE);
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
        this.setColour(Blockly.Msg.SEQUENCE_HUE);
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
        this.setColour(Blockly.Msg.SEQUENCE_HUE);
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
        this.setColour(Blockly.Msg.SEQUENCE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// Sequence.method
Blockly.Blocks['sequence_do'] = {
    init: function () {
        this.OPTIONS = [
            ['pause', 'game4k.pauseTween(this)'],
            ['resume', 'game4k.resumeTween()'],
            ['destroy', 'this.destroy()'],
        ]

        this.appendDummyInput()
            .appendField("with animation")
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "METHOD")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.SEQUENCE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
