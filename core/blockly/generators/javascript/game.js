// Game
Blockly.JavaScript['create_game'] = function (block) {
  var img = Blockly.JavaScript.valueToCode(block, 'IMG', Blockly.JavaScript.ORDER_ATOMIC);
  var w = Blockly.JavaScript.valueToCode(block, 'W', Blockly.JavaScript.ORDER_ATOMIC);
  var h = Blockly.JavaScript.valueToCode(block, 'H', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'game4k.createGame(' + w + ', ' + h + ', ' + img + ');\n';
  return code;
};

Blockly.JavaScript['game_get'] = function (block) {
  var method = block.getFieldValue('PROPERTY');

  var code = 'game4k.game.' + method;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['game_debug'] = function (block) {
  var apply = block.getFieldValue('APPLY') == 'TRUE';

  var code = '';
  code += 'game4k.setDebugMode(' + apply + ');\n';
  return code;
};

Blockly.JavaScript['debug_var'] = function (block) {
  var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'game4k.addInfo(\'' + varName + '\', function () {\n';
  code += 'return ' + varName + ';\n';
  code += '});\n';
  return code;
};

Blockly.JavaScript['debug_log'] = function (block) {
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'console.log(' + text + ');\n';
  return code;
};

Blockly.JavaScript['game_clear'] = function (block) {
  var code = 'game4k.clear();\n';
  return code;
};

Blockly.JavaScript['camera_follow'] = function (block) {
  var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'game4k.game.camera.follow(' + varName + ', Phaser.Camera.FOLLOW_LOCKON, 1, 0.1);\n';
  return code;
};

Blockly.JavaScript['game_print'] = function (block) {
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'game4k.createText(' + x + ', ' + y + ', function () {\n';
  code += 'return ' + text + ';\n';
  code += '});\n';
  return code;
};
