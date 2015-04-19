var Circuit = function(connection_points, matrix) {
  this.connection_points = connection_points;
  this.matrix = matrix;
};

Circuit.prototype.lines = function() {
  var connections = [];
  for (var i = 0; i < this.matrix.length; i++) {
  	var toList = this.matrix[i];
	  for (var j = 0; j < this.matrix.length; j++) {
	  	var isConnected = toList[j] == 1;
	  	if (isConnected) {
	  		var from = this.connection_points[i];
	  		var to = this.connection_points[j];
	  	  var connection = from.drawTo(to);
	  	  connections[connections.length] = connection;
	  	}
	  }
  }
  return connections;
};
