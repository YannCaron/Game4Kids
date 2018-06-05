/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// dynamic images
for (var category in Blockly4kids.gameImages) {

    Blockly.JavaScript['game_image_' + category] = function (block) {
        var img = block.getFieldValue('IMG');
        var code = '\'' + img + '\'';
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
    };

}