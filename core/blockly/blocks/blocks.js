/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

Blockly.Blocks['logic_between'] = {
    init: function() {
      this.appendValueInput("VALUE")
          .setCheck("Number")
          .appendField("");
      this.appendValueInput("ARG1")
          .setCheck("Number")
          .appendField("between");
      this.appendValueInput("ARG2")
          .setCheck("Number")
          .appendField("and");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(Blockly.Msg.LOGIC_HUE);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };