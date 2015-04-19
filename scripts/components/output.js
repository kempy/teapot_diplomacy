var Output = function(x, y) {
  this.shape = createOutputShape(x, y);
};

// Ideally, this should be refactored to have a component super class
// that is extended for output, input and gate.
// But this is a refactor for after the weekend.
Output.prototype.center = Gate.prototype.center;

Output.prototype.drawTo = Gate.prototype.drawTo;

var createOutputShape = function(x, y) {
  var outputShape = new createjs.Shape();
  outputShape.graphics.beginFill('CadetBlue').drawCircle(10,10,10);
  outputShape.x = x;
  outputShape.y = y;
  outputShape.setBounds(0, 0, 20, 20);
  return outputShape;
};