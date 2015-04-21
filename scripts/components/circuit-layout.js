var CircuitLayout = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.operatorWidth = 100;
}

CircuitLayout.prototype.layoutPattern = function(pattern) {
  var verticalInt = this.height / (pattern.length + 1)
  for (var i = 0; i < pattern.length; i++) {
    var y = verticalInt * (i + 1) + this.y + 40;
    var row = pattern[i];
    var horizInt = this.width / (pattern[i].length + 1);
    for (var j = 0; j < row.length; j++) {
      var x = horizInt * (j + 1) + this.x + this.operatorWidth;
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

CircuitLayout.prototype.layoutOperators = function(operators) {
  var verticalInt = this.height / (operators.length + 1);
  var x = (this.operatorWidth / 2);
  console.log('operators here', operators);
  for (var i = 0; i < operators.length; i++) {
    var operator = operators[i];
    console.log('operator', operator);
    if (operator != null) {
      var y = verticalInt * (i + 1) + this.y;
      operator.startingPoint['x'] = x;
      operator.shape.x = x;
      operator.startingPoint['y'] = y;
      operator.shape.y = y;
    }
  }
}
