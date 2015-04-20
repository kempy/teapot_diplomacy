var PlayableCircuit = function (inputs, output, circuit) {
  this.inputs = inputs;
  this.output = output;
  this.circuit = circuit;
  this.selectedInput = 0;
  this.validInputs = [];
  // Set all inputs to be false to start;
  this.resetInputs();
}

PlayableCircuit.prototype.resetInputs = function () {
  for (var input = 0; input < this.inputs.length; input++) {
    this.validInputs[input] = false;
  }
  this.circuit.colorConnections(null);
}

PlayableCircuit.prototype.findAllElementsOfType = function (type) {
  var nodes = this.circuit.connection_points;
  var result = [];
  for (var i=0; i < nodes.length; i++) {
    if (nodes[i] instanceof type) {
      result.push(i);
    }
  }
  return result;
}

PlayableCircuit.prototype.selectInput = function (index) {
  this.selectedInput = index; 
}

PlayableCircuit.prototype.checkAllInputs = function() {
  var inputNodes = this.findAllElementsOfType(Input);
  var outputNodes = this.findAllElementsOfType(Output);
  var isValid = true;
  for (var inputSet = 0; inputSet < this.inputs.length; inputSet++) {
    var inputValues = this.inputs[inputSet];
    var outputResult = this.circuit.validateCircuit(
        inputNodes, inputValues, outputNodes);
    if (inputSet == this.selectedInput) {
      this.circuit.colorConnections(outputResult);
    }
    var valid = this.isValidOutput(outputNodes, outputResult);
    this.validInputs[inputSet] = valid;
    if (!valid) {
      isValid = false;
    }
  }
  return isValid;
}

PlayableCircuit.prototype.isValidOutput = function(outputNodes, outputResult) {
  for (var i = 0; i < this.ouput.length; i++) {
    var idx = outputNodes[i];
    if (outputResult[idx] != this.output[i]) {
      return false;
    }
  }
  return true;
}
