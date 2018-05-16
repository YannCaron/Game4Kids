// dynamic images
for (var category in Blockly4kids.gameImages) {

    Blockly.JavaScript['game_image_' + category] = function (block) {
        var img = block.getFieldValue('IMG');
        var code = '\'' + img + '\'';
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
    };

}