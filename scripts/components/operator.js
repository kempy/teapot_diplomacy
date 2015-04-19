var Operator = function(x, y) {
  var that = this;
  this.startingPoint = { 'x': x, 'y': y };
  this.shape = this.createOperatorShape(x, y);
  this.shape.on('pressmove', function(evt) {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    printed = false;
  });
  this.shape.on('pressup', function(evt) {
    var operator = that;
    var gates = evt.target.stage.gates;
    var noMatch = true;
    for (var i = 0; i < gates.length; i++) {
      var gate = gates[i];
      if (operator.checkIntersection(gate.shape) && !gate.isFull()) {
        noMatch = false;
        operator.snapToGate(gate);
      } else {
        if (gate.containsOperator(operator)) {
          gate.operator = null;
        }
      }
    };
    if (noMatch) {
      for (var i = 0; i < gates.length; i++) {
        var gate = gates[i];
        if (gate.containsOperator(operator)) {
          gate.operator = null;
        }
      };
      operator.snapToStartingPoint();
    }
  });
};

var printed = false;


Operator.prototype.checkIntersection = function(gateShape) {
  var absoluteBounds = this.shape.getTransformedBounds();
  var absoluteCenterX = absoluteBounds.x + (absoluteBounds.width / 2);
  var absoluteCenterY = absoluteBounds.y + (absoluteBounds.height / 2);
  var centerBounds = new createjs.Rectangle(absoluteCenterX, absoluteCenterY);
  if (centerBounds.intersects(gateShape.getTransformedBounds())) {
    if (!printed) {
      console.log('Intersected!');
      printed = true;
    }
    return true;
  }
};

Operator.prototype.snapToStartingPoint = function() {
  this.shape.x = this.startingPoint.x;
  this.shape.y = this.startingPoint.y;
};

Operator.prototype.snapToGate = function(gate) {
  var bounds = gate.shape.getTransformedBounds();
  gate.operator = this;
  this.shape.x = bounds.x + (bounds.width / 2);
  this.shape.y = bounds.y + (bounds.height / 2);
};

/**
 * Create block shape.
 */
Operator.prototype.createOperatorShape = function(x, y) {
  var block = new createjs.Shape();
  block.graphics.beginFill('DeepSkyBlue').drawRect(0, 0, 50, 50);
  block.x = x;
  block.y = y;
  block.regX = 25;
  block.regY = 25;
  block.setBounds(0, 0, 50, 50);
  return block;
};
