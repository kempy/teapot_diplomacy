var Input = function(x, y) {
  this.shape = createInputShape(x, y);
};

Input.prototype.center = Gate.prototype.center;

Input.prototype.drawTo = Gate.prototype.drawTo;

Input.prototype.colorInput = function(inputValue) {
  if (inputValue == 1) {
    this.shape.shapeCommand.style = GLOBALS.TRUE_COLOR;
  } else {
    this.shape.shapeCommand.style = GLOBALS.FALSE_COLOR;
  }
}

var createInputShape = function(x, y) {
  var inputShape = new createjs.Shape();
  var graphics = inputShape.graphics.beginFill('LightGrey');
  inputShape.shapeCommand = graphics.command;
  graphics.drawCircle(10, 10, 10);
  inputShape.x = x;
  inputShape.y = y;
  inputShape.setBounds(0, 0, 20, 20);
  return inputShape;
};
