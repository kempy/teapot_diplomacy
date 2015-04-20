var PlayableCircuit = function (inputs, output, circuit) {
  this.inputs = inputs;
  this.output = output;
  this.circuit = circuit;
  this.selectedInput = 0;
}

PlayableCircuit.prototype._findTypes = function() {
  var connectionSize = this.circuit.connection_points.size
  for (var node in this.circuit.connection_points) {
    
  }
  
}

PlayableCircuit.prototype.selectInput = function(index) {
  
}

PlayableCircuit.prototype.checkInputs() {
  var inputs = this.inputs
  for (var inputSet; inputSet < this.inputs.length; inputSet++) {
    for input

  }
}

PlayableCircuit.prototype._validateOutputs = {

}

