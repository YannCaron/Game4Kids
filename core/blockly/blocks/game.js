/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// Game
Blockly.Blocks['create_game'] = {
  init: function () {
    this.appendValueInput("IMG")
      .setCheck([Blockly.Block.IMAGE_TYPE, "Colour"])
      .appendField('%1 %2 %3'.format(Blockly.Msg.BLOCK_WITH, Blockly.Msg.BLOCK_GAME, Blockly.Msg.BLOCK_SET))
    this.appendValueInput("W")
      .setCheck("Number")
      .appendField(Blockly.Msg.BLOCK_W_TO);
    this.appendValueInput("H")
      .setCheck("Number")
      .appendField(Blockly.Msg.BLOCK_H_TO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.GAME_HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_CREATE);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['game_get'] = {

  init: function () {
    this.OPTIONS = [
      [Blockly.Msg.BLOCK_WIDTH, "game4k.game.world.width"],
      [Blockly.Msg.BLOCK_HEIGHT, "game4k.game.world.height"],
      [Blockly.Msg.BLOCK_WINDOW_WIDTH, "Blockly.Block.windowWidth()"],
      [Blockly.Msg.BLOCK_WINDOW_HEIGHT, "Blockly.Block.windowHeight()"],
      ["%1 x".format(Blockly.Msg.BLOCK_MOUSE_IN), "game4k.game.input.activePointer.x"],
      ["%1 y".format(Blockly.Msg.BLOCK_MOUSE_IN), "game4k.game.input.activePointer.y"],
      ["%1 x".format(Blockly.Msg.CAMERA), "game4k.game.camera.x"],
      ["%1 y".format(Blockly.Msg.CAMERA), "game4k.game.camera.y"],
      ["%1 x".format(Blockly.Msg.CAMERA_DELTA), "game4k.cameraXDelta"],
      ["%1 y".format(Blockly.Msg.CAMERA_DELTA), "game4k.cameraYDelta"],
    ];

    this.appendDummyInput()
      .appendField(Blockly.Msg.BLOCK_GET)
      .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Msg.GAME_HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_GET.format(Blockly.Block.optionList(this.OPTIONS)));
    this.setHelpUrl("");
  }

};


Blockly.Blocks['game_debug'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BLOCK_DEBUG)
      .appendField(new Blockly.FieldCheckbox("TRUE"), "APPLY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.GAME_HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_DEBUG);
    this.setHelpUrl("");
  }
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
    this.setColour(Blockly.Msg.GAME_HUE);
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
    this.setColour(Blockly.Msg.GAME_HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_DEBUG_LOG);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['game_clear'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BLOCK_CLEAR);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.GAME_HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_CLEAR);
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
    this.setColour(Blockly.Msg.GAME_HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_CAMERA_FOLLOW);
    this.setHelpUrl("");
  }
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
  }
};
