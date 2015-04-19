var Input = function(x, y) {
  this.shape = createInputShape(x, y);
};

Input.prototype.center = Gate.prototype.center;

Input.prototype.drawTo = Gate.prototype.drawTo;

var createInputShape = function(x, y) {
  var inputShape = new createjs.Shape();
  inputShape.graphics.beginFill('LightGrey').drawCircle(10, 10, 10);
  inputShape.x = x;
  inputShape.y = y;
  inputShape.setBounds(0, 0, 20, 20)
  return inputShape;
};
