var Circuit = function(nodes, matrix) {
  this.nodes = nodes;
  this.matrix = matrix;
  // An array of lists of easeljs nodes representing lines out from nodes;
  this.connections = [];
};

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

// Return a matrix of 1s and 0s that is the outputs for each node.
Circuit.prototype.validateCircuit(inputNodes, inputValues, outputNodes, outputValues) {
  var resultOutputs = [];
  return resultOutputs;
}
