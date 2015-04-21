var Gate = function(x, y) {
  this.shape = createGateShape(x, y);
  this.operator = null;
};

Gate.prototype.isFull = function() {
  return !!(this.operator);
};

Gate.prototype.containsOperator = function(operator) {
  return !!(this.operator && (this.operator.shape.id == operator.shape.id));
};

Gate.prototype.center = function() {
  var bounds = this.shape.getTransformedBounds();
  var xCenter = bounds.x + (bounds.width / 2);
  var yCenter = bounds.y + (bounds.height / 2);
  return {x: xCenter, y: yCenter};
};

Gate.prototype.drawTo = function(otherGate) {
  var line = new createjs.Shape();
  var gateCenter = this.center();
  var otherGateCenter = otherGate.center();
  var graphics = line.graphics.beginStroke('Green');
  var lineCommand = graphics.command;
  graphics.moveTo(
  	gateCenter.x, gateCenter.y).lineTo(
  	gateCenter.x, otherGateCenter.y).lineTo(
  	otherGateCenter.x, otherGateCenter.y);
  line.lineCommand = lineCommand;
  return line;
};

var createGateShape = function(x, y) {
  var snapBox = new createjs.Shape();
  snapBox.graphics.beginStroke('Blue').beginFill('LightGrey').drawRect(14, 14, 52, 52);
  snapBox.x = x;
  snapBox.y = y;
  snapBox.setBounds(0, 0, 80, 80)
  return snapBox;
};
