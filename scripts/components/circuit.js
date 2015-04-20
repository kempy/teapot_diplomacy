var Circuit = function(nodes, matrix) {
  this.nodes = nodes;
  this.matrix = matrix;
  this.inputNodeIndices = this.findAllElementsOfType(Input);
  this.outputNodeIndices = this.findAllElementsOfType(Output);
  this.gateNodeIndices = this.findAllElementsOfType(Gate);
  // An array of lists of easeljs nodes representing lines out from nodes;
  this.connections = [];
  this.CIRCUIT_VALIDATOR = {};
};

// Returns a list of indices of nodes of type (e.g. all input nodes or all output nodes).
Circuit.prototype.findAllElementsOfType = function (type) {
  var nodes = this.nodes;
  var result = [];
  for (var i=0; i < nodes.length; i++) {
    if (nodes[i] instanceof type) {
      result.push(i);
    }
  }
  return result;
}

Circuit.prototype.addConnections = function(stage) {
  for (var i = 0; i < this.matrix.length; i++) {
    this.connections[i] = [];
  	var toList = this.matrix[i];
	  for (var j = 0; j < toList.length; j++) {
	  	var isConnected = toList[j] == 1;
	  	if (isConnected) {
	  		var from = this.nodes[i];
	  		var to = this.nodes[j];
	  	  var connection = from.drawTo(to);

        // Add connection to connections list
        this.connections[i][this.connections[i].length] = connection;
        stage.addChild(connection);
	  	}
	  }
  }
};

Circuit.prototype.addNodes = function(stage) {
  for (var node in this.nodes) {
  	stage.addChild(this.nodes[node].shape);
  }
};

Circuit.prototype.colorConnections = function(outputsList) {
  for (var i = 0; i < this.connections.length; i++) {
    var color = 'Gray';
    if (outputsList) {
      if (outputsList[i] == 1) {
        color = 'Green';
      } else {
        color = 'Blue';
      }
    }
    for (var j = 0; j < this.connections[i].length; j++) {
      this.connections[i][j].lineCommand.style = color;
    }
  }
};

Circuit.prototype.getInputNodeValue = function(nodeIndex, inputValues) {
	for (var i = 0; i < this.inputNodeIndices.length; i++) {
		var inputNodeIndex = this.inputNodeIndices[i];
		if (inputNodeIndex == nodeIndex) {
			return inputValues[i];
		}
	}
};

// Check to see if this is being called at some point.
Circuit.prototype.getIndex = function(node) {
	for (var i = 0; i < this.nodes.length; i++) {
		if (this.nodes[i].shape.id == node.shape.id) {
			return i;
		}
	}
};

Circuit.prototype.getIncomingNodeIndices = function(nodeIndex) {
	var incomingNodeIndices = [];
	for (var i = 0; i < this.matrix.length; i++) {
		var thisRow = this.matrix[i];
		if (thisRow[nodeIndex] == 1) {
			// This is a super hacky way to do this, but Zoe realizes she may
			// just be spoiled by Underscore and Backbone and have not had to 
			// work with native JavaScript in a while.
			incomingNodeIndices[incomingNodeIndices.length] = i;
		}
	}
	return incomingNodeIndices;
};

Circuit.prototype.getOutputForNode = function(nodeIndex, inputValues) {
	var node = this.nodes[nodeIndex];
	var retValue = null;
	if (node instanceof Input) {
		retValue = this.getInputNodeValue(nodeIndex, inputValues);
	} else if (node instanceof Output) {
		var incomingNodeIndex = this.getIncomingNodeIndices(nodeIndex);
		retValue = this.getOutputForNode(
			incomingNodeIndex[0], inputValues);
	} else if (node instanceof Gate) {
		// Find all incoming values.
		var incomingNodeIndices = this.getIncomingNodeIndices(nodeIndex);
		var incomingValues = [];
		for (var i = 0; i < incomingNodeIndices.length; i++) {
			var output = this.getOutputForNode(incomingNodeIndices[i], inputValues);
			incomingValues[i] = output;
		}
		// Execute the operation in the current gate on the incoming values.
		var operation = node.operator.operation;
		if (incomingValues.length == 1) {
			retValue = operation(incomingValues[0]);
		} else {
			retValue = operation(incomingValues[0], incomingValues[1]);
		}
	}
	this.CIRCUIT_VALIDATOR[nodeIndex] = retValue;
	return retValue;
};

// Return a matrix of 1s and 0s that is the outputs for each node.
Circuit.prototype.validateCircuit = function(inputValues) {
  var resultOutputs = [];
  this.CIRCUIT_VALIDATOR = {};
  // For every output node, get 
  for (var i = 0; i < this.outputNodeIndices.length; i++) {
  	this.getOutputForNode(this.outputNodeIndices[i], inputValues);
  }
  for (var i in this.CIRCUIT_VALIDATOR) {
  	resultOutputs.push(this.CIRCUIT_VALIDATOR[i]);
  }
  return resultOutputs;
};
