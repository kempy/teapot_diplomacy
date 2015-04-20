var PlayableCircuit = function (inputs, output, circuit) {
  this.inputs = inputs;
  this.output = output;
  this.circuit = circuit;
  this.selectedInput = 0;
  this.correctInputs = [];
  // Set all inputs to be false to start;
  this.resetInputs();
};

PlayableCircuit.prototype.resetInputs = function () {
  for (var input = 0; input < this.inputs.length; input++) {
    this.correctInputs[input] = false;
  }
  this.circuit.colorConnections(null);
};

PlayableCircuit.prototype.selectInput = function (index) {
  this.selectedInput = index; 
};

PlayableCircuit.prototype.checkAllGatesFilled = function() {
  for (var i = 0; i < this.circuit.gateNodeIndices.length; i++) {
    var gateIndex = this.circuit.gateNodeIndices[i];
    var gate = this.circuit.nodes[gateIndex];
    if (!gate.isFull()) {
      return false;
    }
  }
  return true;
};

PlayableCircuit.prototype.checkAllInputs = function() {
  if (!this.checkAllGatesFilled()) {
    this.resetInputs();
    return false;
  }
  var outputNodes = this.circuit.outputNodeIndices;
  var isCorrectForAllInputs = true;
  for (var inputSet = 0; inputSet < this.inputs.length; inputSet++) {
    var inputValues = this.inputs[inputSet];
    var outputResult = this.circuit.validateCircuit(inputValues);
    if (inputSet == this.selectedInput) {
      this.circuit.colorConnections(outputResult);
    }
    var correct = this.isCorrectOutput(outputNodes, outputResult);
    this.correctInputs[inputSet] = correct;
    if (!correct) {
      isCorrectForAllInputs = false;
    }
  }
  console.log('isCorrectForAllInputs');
  console.log(isCorrectForAllInputs);
  return isCorrectForAllInputs;
};

PlayableCircuit.prototype.isCorrectOutput = function(outputNodes, outputResult) {
  for (var i = 0; i < this.output.length; i++) {
    var idx = outputNodes[i];
    if (outputResult[idx] != this.output[i]) {
      return false;
    }
  }
  return true;
};
