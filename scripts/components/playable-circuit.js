var PlayableCircuit = function (inputs, output, circuit) {
  this.inputs = inputs;
  this.output = output;
  this.circuit = circuit;
  this.selectedInput = 0;
  this.correctInputs = [];
  this.inputSets = [];
  this.done = false;
  // Set all inputs to be false to start;
};

PlayableCircuit.prototype.addInputSetsToStage = function (stage) {
  for (var i = 0; i < this.inputs.length; i++) {
    var inputSet = new InputSet(this, this.inputs[i], i);
    inputSet.createContainer();
    stage.addChild(inputSet.container);
    this.inputSets.push(inputSet);
  }
  this.selectInput(this.selectedInput, true);
  this.resetInputs();
}

PlayableCircuit.prototype.resetInputs = function () {
  for (var index = 0; index < this.inputs.length; index++) {
    this.correctInputs[index] = false;
    this.inputSets[index].setStatus(false);
  }
  this.circuit.colorConnections(null);
};

PlayableCircuit.prototype.selectInput = function (index, force) {
  if (index == this.selectedInput && force != true) {
    return;
  }
  var oldIndex = this.selectedInput;
  this.selectedInput = index; 
  this.inputSets[oldIndex].deselect();
  this.inputSets[index].select();
  console.log('calling colorInputs(',this.inputs[index],')');
  this.circuit.colorInputs(this.inputs[index]);
  this.checkAllInputs();
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
    this.inputSets[inputSet].setStatus(correct);
    if (!correct) {
      isCorrectForAllInputs = false;
    }
  }
  console.log('isCorrectForAllInputs');
  console.log(isCorrectForAllInputs);
  this.done = isCorrectForAllInputs;
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
