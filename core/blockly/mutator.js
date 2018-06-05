/*

Copyright Yann Caron (c) 2018 - 2019
All right reserved.

*/
// license above

// Mutator
Blockly.MutatorBuilder = function (name) {
    this.name_ = name;
    this.mixins_ = new Map();
}

Blockly.MutatorBuilder.SEPARATOR = ';';

Blockly.MutatorBuilder.prototype.addMixin = function (name, inputs, builder) {
    this.mixins_.set(name, { inputs: inputs, builder: builder });
    return this;
}

Blockly.MutatorBuilder.prototype.build_ = function () {
    var self = this;

    return {
        structure_: [],

        initMap_: function (value) {
            var map = {};
            for (var key of this.structure_) {
                map[key] = value;
            }
            return map;
        },
        updateShape_: function () {
            // Delete everything.
            var keys = new Set(Array.from(self.mixins_.keys()));
            for (var key of keys) {
                for (var input of self.mixins_.get(key).inputs) {
                    var i = 1;
                    while (this.getInput(input + i)) {
                        this.removeInput(input + i);
                        i++;
                    }
                }
            }

            // Rebuild block.
            var counts = this.initMap_(0)
            for (var key of this.structure_) {
                counts[key] += 1;
                self.mixins_.get(key).builder(this, counts[key]);
            }
        },
        // save to HTML page
        mutationToDom: function () {
            if (this.structure_.length == 0) {
                return null;
            }
            var container = document.createElement('mutation');
            container.setAttribute('structure', this.structure_.join(Blockly.MutatorBuilder.SEPARATOR));
            return container;
        },
        domToMutation: function (xmlElement) {
            this.structure_ = xmlElement.getAttribute('structure').split(Blockly.MutatorBuilder.SEPARATOR);
            this.updateShape_();
        },
        // build from dialog
        decompose: function (workspace) {
            var containerBlock = workspace.newBlock(self.name_);
            containerBlock.initSvg();
            var connection = containerBlock.nextConnection;
            for (var key of this.structure_) {
                var block = workspace.newBlock(key);
                block.initSvg();
                connection.connect(block.previousConnection);
                connection = block.nextConnection;
            }
            return containerBlock;
        },
        compose: function (containerBlock) {
            var clauseBlock = containerBlock.nextConnection.targetBlock();
            this.structure_ = [];
            var connections = {};
            var fieldValues = {};

            while (clauseBlock) {
                this.structure_.push(clauseBlock.type);

                for (var inp of self.mixins_.get(clauseBlock.type).inputs) {

                    // save fields value
                    var i = 1;
                    while (this.getField(inp + i)) {
                        var id = inp + i;
                        fieldValues[id] = this.getFieldValue(id);
                        i++;
                    }

                    // save connections
                    if (clauseBlock.connections_) {
                        connections[clauseBlock.type] = clauseBlock.connections_;
                    }
                }

                clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
            }
            this.updateShape_();

            // restaur fields value
            for (var key in fieldValues) {
                this.setFieldValue(fieldValues[key], key);
            }

            // restaur connections
            for (var key in connections) {
                for (var data of connections[key]) {
                    if (data != null) {
                        Blockly.Mutator.reconnect(data.connection, this, data.name);
                    }
                }
            }
        },
        // save state
        saveConnections: function (containerBlock) {
            var clauseBlock = containerBlock.nextConnection.targetBlock();
            while (clauseBlock) {

                clauseBlock.connections_ = [];
                for (var inp of self.mixins_.get(clauseBlock.type).inputs) {
                    var i = 1;
                    while (this.getInput(inp + i)) {
                        var inputName = inp + i;
                        var input = this.getInput(inputName);

                        if (input.connection != null) {
                            clauseBlock.connections_.push({ name: inputName, connection: input && input.connection.targetConnection });
                        }
                        i++;
                    }
                }

                clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();

            }
        }
    }

}

Blockly.MutatorBuilder.prototype.register = function (name) {
    Blockly.Extensions.registerMutator(name, this.build_(), null, Array.from(this.mixins_.keys()));

}
