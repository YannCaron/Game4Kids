// global
Blockly.Blocks.game = {};
Blockly.Blocks.game.HUE = Blockly.Msg.GAME_HUE;

// Game
Blockly.Blocks['create_game'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('%1 %2 %3'.format(Blockly.Msg.BLOCK_WITH, Blockly.Msg.BLOCK_GAME, Blockly.Msg.BLOCK_SET))
    this.appendValueInput("IMG")
      .setCheck(Blockly.Block.IMAGE_TYPE)
    this.appendValueInput("W")
      .setCheck("Number")
      .appendField(Blockly.Msg.BLOCK_W_TO);
    this.appendValueInput("H")
      .setCheck("Number")
      .appendField(Blockly.Msg.BLOCK_H_TO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_CREATE);
    this.setHelpUrl("");
  },

  runIn: 'create'
};

Blockly.Blocks['game_get'] = {

  init: function () {
    this.OPTIONS = [
      [Blockly.Msg.BLOCK_WIDTH, "world.width"],
      [Blockly.Msg.BLOCK_HEIGHT, "world.height"],
      ["%1 x".format(Blockly.Msg.BLOCK_MOUSE_IN), "input.activePointer.x"],
      ["%1 y".format(Blockly.Msg.BLOCK_MOUSE_IN), "input.activePointer.y"],
    ];

    this.appendDummyInput()
      .appendField('%1 %2 %3'.format(Blockly.Msg.BLOCK_WITH, Blockly.Msg.BLOCK_GAME, Blockly.Msg.BLOCK_GET))
      .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_GET.format(Blockly.Block.optionList(this.OPTIONS)));
    this.setHelpUrl("");
  },

  runIn: 'create'

};


Blockly.Blocks['game_debug'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BLOCK_DEBUG)
      .appendField(new Blockly.FieldCheckbox("TRUE"), "APPLY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_DEBUG);
    this.setHelpUrl("");
  },

  runIn: 'create'
};

Blockly.Blocks['debug_var'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("%1 %2".format(Blockly.Msg.BLOCK_DEBUG, Blockly.Msg.BLOCK_VALUE_OF))
    this.appendValueInput("VAR")
      .setCheck(null)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_DEBUG_VAR);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['debug_log'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BLOCK_LOG)
    this.appendValueInput("TEXT")
      .setCheck(null)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_DEBUG_LOG);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['camera_follow'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.CAMERA_FOLLOW);
    this.appendValueInput("VAR")
      .setCheck(Blockly.Block.ACTOR_TYPE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_CAMERA_FOLLOW);
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);
  },

  runIn: 'create'
};

Blockly.Blocks['game_print'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('%1 %2'.format(Blockly.Msg.PRINT, Blockly.Msg.AT));
    this.appendValueInput("X")
      .setCheck("Number")
      .appendField("x");
    this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("y");
    this.appendValueInput("TEXT")
      .setCheck("String")
      .appendField(Blockly.Msg.TEXT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_PRINT);
    this.setHelpUrl("");
  },

  runIn: 'create'
};
