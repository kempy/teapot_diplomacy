var Gate = function(x, y) {
  this.shape = createGateShape(x, y);
  this.operator = null;
};

Gate.prototype.isFull = function() {
  return !!(this.operator);
};

Gate.prototype.containsOperator = function(operator) {
  return !!(this.operator && (this.operator.id == operator.id));
};

var createGateShape = function(x, y) {
  var snapBox = new createjs.Shape();
  snapBox.graphics.beginStroke('Blue').drawRect(14, 14, 52, 52);
  snapBox.x = x;
  snapBox.y = y;
  snapBox.setBounds(0, 0, 80, 80)
  return snapBox;
};
