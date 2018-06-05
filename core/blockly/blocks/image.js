/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// dynamic images
Blockly.Blocks.imageInterpreter = function (img) {
    var data = img.replace(/'/g, '').split('#');
    return { 'key': data[0], 'url': data[1], 'strW': data[2], 'strH': data[3], 'strOffsetW': data[4], 'strOffsetH': data[5] };
}

for (var category in Blockly4kids.gameImages) {

    Blockly.Blocks['game_image_' + category] = {
        category: category,

        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(Blockly4kids.gameImages[this.category]), 'IMG')
            this.setOutput(true, Blockly.Block.IMAGE_TYPE);
            this.setColour(Blockly.Msg.IMAGE_HUE);
            this.setTooltip(Blockly.Msg.TOOLTIP_GAME_IMAGE.format(this.category));
            this.setHelpUrl("");
        },

        getImage: function () {
            var img = this.getFieldValue('IMG');
            return Blockly.Blocks.imageInterpreter(img);
        }
    };
}