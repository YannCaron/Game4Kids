/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// global
Blockly.Blocks.event = Blockly.Blocks.event || {};
Blockly.Blocks.event.HUE = Blockly.Msg.EVENT_HUE;

Blockly.Block.IMAGE_TYPE = 'Image';
Blockly.Block.ACTOR_TYPE = 'Actor';
Blockly.Block.ANIM_TYPE = 'Anim';
Blockly.Block.ANIM_TIME_TYPE = 'AnimTime';
Blockly.Block.RELATIVE_TYPE = 'Relative';

Blockly.Block.windowWidth = function () { return window.innerWidth - 1; };
Blockly.Block.windowHeight = function () { return window.innerHeight - 88; };

Blockly.Block.BACKGROUND_CATEGORY = 'Background';

// dynamic
Blockly.dynamic = Blockly.dynamic || {};

Blockly.dynamic.buildLabel = function (name) {
    return '<label text="' + name + '"></label>';
}

Blockly.dynamic.buildShadow = function (name, type, value) {
    return '<value name="' + name + '">' +
        '<shadow type="' + type + '">' + value + '</shadow>' +
        '</value>';
}

Blockly.dynamic.buildShadowVariable = function (name, value = '') {
    return '<value name="' + name + '">' +
        '<shadow type="variables_get"><field name="VAR">' + value + '</field></shadow>' +
        '</value>';
}

Blockly.dynamic.buildShadowObject = function (name) {
    return '<value name="' + name + '">' +
        '<shadow type="actor_object"></shadow>' +
        '</value>';
}

Blockly.dynamic.buildShadowGameGetWidth = function () {
    return '<value name="W">' +
        '<shadow type="game_get">' +
        '<field name="PROPERTY">Blockly.Block.windowWidth()</field>' +
        '</shadow>' +
        '</value>';
};

Blockly.dynamic.buildShadowGameGetHeight = function () {
    return '<value name="H">' +
        '<shadow type="game_get">' +
        '<field name="PROPERTY">Blockly.Block.windowHeight()</field>' +
        '</shadow>' +
        '</value>';
};

Blockly.dynamic.buildShadowBackground = function (name) {
    return '<value name="' + name + '">' +
        '<shadow type="game_image_' + Blockly.Block.BACKGROUND_CATEGORY + '"></shadow>' +
        '</value>';
}

Blockly.dynamic.buildShadowImage = function (name) {
    return '<value name="' + name + '">' +
        '<shadow type="game_image_PlanetCute"></shadow>' +
        '</value>';
}

Blockly.dynamic.buildShadowBoolean = function (name, defaultValue = 0) {
    return '<value name="' + name + '">' +
        '<shadow type="logic_boolean">' +
        '<field name="BOOL">' + defaultValue + '</field>' +
        '</shadow>' +
        '</value>';
};

Blockly.dynamic.buildShadowNumber = function (name, defaultValue = 0) {
    return '<value name="' + name + '">' +
        '<shadow type="math_number">' +
        '<field name="NUM">' + defaultValue + '</field>' +
        '</shadow>' +
        '</value>';
};

Blockly.dynamic.buildShadowText = function (name, defaultValue = '') {
    return '<value name="' + name + '">' +
        '<shadow type="text">' +
        '<field name="TEXT">' + defaultValue + '</field>' +
        '</shadow>' +
        '</value>';
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

// block
Blockly.Block.prototype.hasParentOfType = function (type) {
    return this.getParent() && this.getParent().type == type;
}

Blockly.Block.prototype.containedByParentInput = function (input) {
    return this.getParent().getInput(input)
        && this.getParent().getInput(input).connection.targetConnection
        && this.getParent().getInput(input).connection.targetConnection.sourceBlock_ == this
}

Blockly.Block.optionList = function (options) {
    var result = [];
    for (var i in options) {
        result.push(' - ' + options[i][0]);
    }
    return result.join('\n');
}

Blockly.Block.DEFAULT_ACTOR = 'actor';

Blockly.Block.prototype.fieldActorFactory = function (selectLast = false, fieldName = 'VAR') {
    var value = selectLast ? this.getLastCreatedActor() : Blockly.Block.DEFAULT_ACTOR;

    if (this.fieldNames_ == undefined) this.fieldNames_ = new Set();
    this.fieldNames_.add(fieldName);

    this.setOnChange(this.selectNearestActor);

    return new Blockly.FieldVariable(
        value,
        null, [Blockly.Block.ACTOR_TYPE], Blockly.Block.ACTOR_TYPE);
}

Blockly.Block.prototype.findNearestActorDeclaration = function () {
    var parent = this.getParent();

    while (parent != undefined) {
        if (parent.type === 'create_actor') {
            parentVariable = parent.getField('VAR').getVariable();
            return parentVariable;
        }

        parent = parent.getParent();
    }

    return null;
}

Blockly.Block.prototype.getLastCreatedActor = function () {
    var variables = this.workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);
    if (variables.length <= 0) {
        return null;
    }
    return variables[variables.length - 1].name;
}

Blockly.Block.prototype.selectNearestActor = function (change) {
    for (var fieldName of this.fieldNames_) {
        if (this.getField(fieldName)) {
            var variable = this.getField(fieldName).getVariable();

            if (variable.name && change.newParentId != undefined && variable.name == Blockly.Block.DEFAULT_ACTOR) {
                var nearestDeclaredActor = this.findNearestActorDeclaration();

                if (nearestDeclaredActor != null) {
                    this.getField(fieldName).setValue(nearestDeclaredActor.getId());
                }
            }
        }
    }
}

// for error management purpose
Blockly.Block.prototype.setAndShowWarning = function (text) {
    this.setWarningText(text);
    this.warning.setVisible(true);
}

Blockly.Block.prototype.clearWarning = function () {
    this.setWarningText(null);
}
// xml
Blockly.Xml.xmlToDom = function (xml) {
    return Blockly.Xml.textToDom('<xml>' + xml + '</xml>').firstChild;
}
