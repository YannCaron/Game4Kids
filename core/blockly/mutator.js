// Mutator
Blockly.MutatorBuilder = function (name) {
    this.name_ = name;
    this.mixins_ = new Map();
}

Blockly.MutatorBuilder.SEPARATOR = ';';

Blockly.MutatorBuilder.prototype.addMixin = function (name, builder, clearer) {
    this.mixins_.set(name, {builder : builder, clearer : clearer});
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
            var counts = this.initMap_(0)
            for (var key of this.structure_) {
                counts[key] += 1;
                self.mixins_.get(key).clearer(this, counts[key]);
            }

            // Rebuild block.
            counts = this.initMap_(0)
            for (var key of this.structure_) {
                counts[key] += 1;
                self.mixins_.get(key).builder(this, counts[key]);
            }
        },
        mutationToDom: function () {
            if (this.structure_.length == 0) {
                return null;
            }
            var container = document.createElement('mutation');
            container.setAttribute('structure', this.structure_.join(Blockly.MutatorBuilder.SEPARATOR));
            console.log(this.structure_);
            return container;
        },
        domToMutation: function (xmlElement) {
            console.log(xmlElement);
            this.structure_ = xmlElement.getAttribute('structure').split(Blockly.MutatorBuilder.SEPARATOR);
            this.updateShape_();
        },
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
        /**
         * Reconfigure this block based on the mutator dialog's components.
         * @param {!Blockly.Block} containerBlock Root block in mutator.
         * @this Blockly.Block
         */
        compose: function (containerBlock) {
            var clauseBlock = containerBlock.nextConnection.targetBlock();
            this.structure_ = [];
            var connections = this.initMap_([null]);

            while (clauseBlock) {
                this.structure_.push(clauseBlock.type);

                clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
            }
            this.updateShape_();
            // TODO reconnect

            /*
            var clauseBlock = containerBlock.nextConnection.targetBlock();
            // Count number of inputs.
            this.thenCount_ = 0;
            var valueConnections = [null];
            var statementConnections = [null];
            var elseStatementConnection = null;
            while (clauseBlock) {
                switch (clauseBlock.type) {
                    case 'create_sequence_then':
                        this.thenCount_++;
                        valueConnections.push(clauseBlock.valueConnection_);
                        statementConnections.push(clauseBlock.statementConnection_);
                        break;
                    default:
                        throw 'Unknown block type.';
                }
                clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
            }
            this.updateShape_();
            // Reconnect any child blocks.
            for (var i = 1; i <= this.thenCount_; i++) {
                Blockly.Mutator.reconnect(statementConnections[i], this, 'STMT' + i);
            }*/
        },
        /**
         * Store pointers to any connected child blocks.
         * @param {!Blockly.Block} containerBlock Root block in mutator.
         * @this Blockly.Block
         */
        saveConnections: function (containerBlock) {
            /*
            var clauseBlock = containerBlock.nextConnection.targetBlock();
            while (clauseBlock) {
            }*/
            // TODO save connections

            var clauseBlock = containerBlock.nextConnection.targetBlock();
            var i = 1;
            while (clauseBlock) {
                switch (clauseBlock.type) {
                    case 'create_sequence_then':
                        var inputDo = this.getInput('STMT' + i);
                        clauseBlock.statementConnection_ =
                            inputDo && inputDo.connection.targetConnection;
                        i++;
                        break;
                    default:
                        throw 'Unknown block type.';
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
