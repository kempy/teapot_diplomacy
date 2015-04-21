var CircuitBuilder = function() {
  this.nodes = [];
  this.fixedGates = [];
  this.moveableGates = [];
  this.output = [];
  this.inputSets = [];
  this.circuitLayout = new CircuitLayout(-50, 0,  450, 600);
  this.layoutPattern = null;
  this.extraOperators = [];
}

var NodeBuilder = function(parents, nodeFn, index) {
  this.parents = parents;
  this.nodeFn = nodeFn;
  this.index = index;
}

CircuitBuilder.prototype.addBinaryGate = function(gateOp, left, right, fixed) {
  var nodeFn = function() {
    var gate = new Gate(0, 0);
    var operator = new Operator(gateOp, 0, 0);
    gate.operator = operator;
    return gate;
  }
  var parents = [];
  if (left) {
    parents.push(left);
  }
  if (right) {
    parents.push(right);
  }
  var node = new NodeBuilder(parents, nodeFn, this.nodes.length);
  this.nodes.push(node);
  if (fixed == true) {
    this.fixedGates.push(node.index);
  } else {
    this.moveableGates.push(node.index);
  }
  return node;
}

CircuitBuilder.prototype.addUnaryGate = function(gateOp, input, fixed) {
  var nodeFn = function() {
    var gate = new Gate(0, 0);
    var operator = new Operator(gateOp, 0, 0);
    gate.operator = operator;
    return gate;
  }
  var parents = [];
  if (input) {
    parents.push(input);
  }
  var node = new NodeBuilder(parents, nodeFn, this.nodes.length);
  this.nodes.push(node);
  if (fixed == true) {
    this.fixedGates.push(node.index);
  } else {
    this.moveableGates.push(node.index);
  }
  return node;
}

CircuitBuilder.prototype.addInput = function() {
  var nodeFn = function() {
    var input = new Input(0, 0);
    return input;
  }
  var parents = [];
  var node = new NodeBuilder(parents, nodeFn, this.nodes.length);
  this.nodes.push(node);
  return node;
}

CircuitBuilder.prototype.addOutput = function(input, value) {
  var nodeFn = function() {
    var output = new Output(0, 0);
    return output;
  }
  var parents = [input];
  var node = new NodeBuilder(parents, nodeFn, this.nodes.length);
  this.output.push(value);
  this.nodes.push(node);
  return node;
}

CircuitBuilder.prototype.setInputSets = function(inputSets) {
  this.inputSets = inputSets;
}

CircuitBuilder.prototype.addInputSet = function(inputSet) {
  this.inputSets.push(inputSet);
}

CircuitBuilder.prototype.addLayoutPattern = function(layout) {
  this.layoutPattern = layout;
}

CircuitBuilder.prototype.build = function() {
  var nodes = [];
  var matrix = [];
  for (var i = 0; i < this.nodes.length; i++) {
    var row = [];
    matrix.push(row);
    for (var j = 0; j < this.nodes.length; j++) {
      row.push(0);
    }
    nodes.push(this.nodes[i].nodeFn());
  }
  for (var i = 0; i < this.nodes.length; i++) {
    var parents = this.nodes[i].parents;
    for (var j = 0; j < parents.length; j++) {
      matrix[parents[j].index][i] = 1;
    }
  }
  console.log(matrix);

  var circuit = new Circuit(nodes, matrix);
  return circuit;
}

CircuitBuilder.prototype.fixGates = function(circuit) {
  for (var i = 0; i < this.fixedGates.length; i++) {
    var gate = circuit.nodes[this.fixedGates[i]];
    gate.operator.fixOperator();
    gate.operator.snapToGate(gate);
  }
}

CircuitBuilder.prototype.popOutOperators = function(circuit) {
  var operators = [];
  for (var i = 0; i < this.moveableGates.length; i++) {
    var gate = circuit.nodes[this.moveableGates[i]];
    var operator = gate.operator;
    gate.operator = null;
    operators.push(operator);
  }
  return operators;
}

CircuitBuilder.prototype.getAllGates = function(circuit) {
  var gates = [];
  for (var i = 0; i < this.moveableGates.length; i++) {
    var gate = circuit.nodes[this.moveableGates[i]];
    gates.push(gate);
  }
  for (var i = 0; i < this.fixedGates.length; i++) {
    var gate = circuit.nodes[this.moveableGates[i]];
    gates.push(gate);
  }
  return gates;
}

CircuitBuilder.prototype.addExtraOperator = function(op) {
  this.extraOperators.push(op);
}


CircuitBuilder.prototype.buildLevelInitFn = function(nextLevel) {
  var that = this;
  var lm = teapot.levelManager;
  function initFn(level) {

    var stage = level.stage;
    stage.removeAllChildren();

    var circuit = that.build();
    var layout = that.circuitLayout;
    that.circuitLayout.layoutCircuit(circuit, that.layoutPattern);
    that.fixGates(circuit);
    var operators = that.popOutOperators(circuit);
    for (var i=0; i < that.extraOperators.length; i++) {
      var op = new Operator(that.extraOperators[i], 0, 0);
      operators.push(op);
    }
    layout.layoutOperators(operators);

    // Stage circuit
    circuit.addConnections(stage);
    circuit.addNodes(stage);
    var playableCircuit = new PlayableCircuit(that.inputSets, that.output, circuit);

    // Stage operators.
    for (var i = 0; i < operators.length; i++) {
      stage.addChild(operators[i].shape);
    }

    // Stage input sets
    playableCircuit.addInputSetsToStage(stage)

    stage.gates = that.getAllGates(circuit);
    console.log('gates', stage.gates);
    stage.playableCircuit = playableCircuit;

    level.tick = function() {
      if (playableCircuit.done) {
        var nextStageFn = null;
        nextStageFn = function (evt) {
          lm.startLevel(nextLevel);
          evt.target.removeEventListener('stagemouseup', nextStageFn);
        };
        stage.addEventListener('stagemouseup', nextStageFn);
        playableCircuit.done = false;
      }
    }
  }
  return initFn;
}
