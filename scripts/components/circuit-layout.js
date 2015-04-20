var CircuitLayout = function(x, y, height, width) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
}

CircuitLayout.prototype.layoutPattern = function(pattern) {
  var verticalInt = this.height / (pattern.length + 1)
  for (var i = 0; i < pattern.length; i++) {
    var y = verticalInt * (i + 1) + this.y;
    var row = pattern[i];
    var horizInt = this.width / (pattern[i].length + 1);
    for (var j = 0; j < row.length; j++) {
      var x = horizInt * (j + 1) + this.x;
      // console.log('i=', i, ', j=', j, ', x=', x, ', y=', y);
      if (row[j] != null) {
        row[j].shape.x = x;
        row[j].shape.y = y;
      }
    }
  }
}

CircuitLayout.prototype.layoutCircuit = function(circuit, layout) {
  console.log('laying out pattern');
  var pattern = this.generatePattern(circuit, layout);
  this.layoutPattern(pattern);
}

CircuitLayout.prototype.generatePattern = function(circuit, layout) {
  var pattern = [];
  for (var i = 0; i < layout.length; i++) {
    var row = [];
    for (var j = 0; j < layout[i].length; j++) {
      if (layout[i][j] != -1) {
        row.push(circuit.nodes[layout[i][j]]);
      } else {
        row.push(null);
      }
    }
    pattern.push(row);
  }
  return pattern;
}
