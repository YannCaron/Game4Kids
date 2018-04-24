// Game
Blockly.JavaScript['create_game'] = function (block) {
  var img = Blockly.JavaScript.valueToCode(block, 'IMG', Blockly.JavaScript.ORDER_ATOMIC);
  var w = Blockly.JavaScript.valueToCode(block, 'W', Blockly.JavaScript.ORDER_ATOMIC);
  var h = Blockly.JavaScript.valueToCode(block, 'H', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'game4k.createGame(' + w + ', ' + h + ', ' + img + ');';
  code += block.lineCode();

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
  code += 'game4k.setDebugMode(' + apply + ');';
  code += block.lineCode();

  return code;
};

Blockly.JavaScript['debug_var'] = function (block) {
  var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'game4k.addInfo(\'' + varName + '\', function () {';
  code += block.lineCode();
  code += 'return ' + varName + ';';
  code += block.lineCode();
  code += '});\n';
  return code;
};

Blockly.JavaScript['debug_log'] = function (block) {
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'console.log(' + text + ');';
  code += block.lineCode();
  return code;
};

Blockly.JavaScript['game_clear'] = function (block) {
  var code = 'game4k.clear();';
  code += block.lineCode();
  return code;
};

Blockly.JavaScript['camera_follow'] = function (block) {
  var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'game4k.game.camera.follow(' + varName + ', Phaser.Camera.FOLLOW_LOCKON, 1, 0.1);';
  code += block.lineCode();

  return code;
};

Blockly.JavaScript['game_print'] = function (block) {
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'game4k.createText(' + x + ', ' + y + ', function () {';
  code += block.lineCode();
  code += 'return ' + text + ';';
  code += block.lineCode();
  code += '});\n';
  return code;
};
