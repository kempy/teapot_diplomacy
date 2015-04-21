var Operator = function(kind, x, y) {
  var that = this;
  this.kind = kind;
  this.disableMove = false;
  this.operation = OPERATIONS[kind];
  this.startingPoint = { 'x': x, 'y': y };
  this.shape = this.createOperatorShape(x, y);
  this.shape.on('pressmove', function(evt) {
    if (!that.disableMove) {
      evt.target.x = evt.stageX;
      evt.target.y = evt.stageY;
      printed = false;
    }
  });

  this.shape.on('pressup', function(evt) {
    if (!that.disableMove) {
      var operator = that;
      var gates = evt.target.stage.gates;
      var noMatch = true;
      // Check if the operator instersects any of the gates.
      for (var i = 0; i < gates.length; i++) {
        var gate = gates[i];
        if (operator.checkIntersection(gate.shape) && !gate.isFull()) {
          noMatch = false;
          operator.snapToGate(gate);
        } else if (gate.containsOperator(operator)) {
          gate.operator = null;
        }
      };
      // If the operator does not intersect, check all the gates for the operator to clear.
      if (noMatch) {
        for (var i = 0; i < gates.length; i++) {
          var gate = gates[i];
          if (gate.containsOperator(operator)) {
            gate.operator = null;
          }
        };
        operator.snapToStartingPoint();
      }
      evt.target.stage.playableCircuit.checkAllInputs();
    }
  });
};

var printed = false;

Operator.prototype.fixOperator = function() {
  this.disableMove = true;
}

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
  var block = new createjs.Bitmap(IMAGE_FILES[this.kind]);
  block.x = x;
  block.y = y;
  block.alpha = 1;
  block.width = 50;
  block.height = 50;
  block.regX = 25;
  block.regY = 25;
  block.setBounds(0, 0, 50, 50);
  return block;
};

var AND_FUNCTION = function(x, y) {
    return x & y;
};

var OR_FUNCTION = function(x, y) {
    return x | y;
};

var XOR_FUNCTION = function(x, y) {
    return x ^ y;
};

var NOT_FUNCTION = function(x) {
  return !x;
};

var NAND_FUNCTION = function(x, y) {
    return !(x & y);
};

var NOR_FUNCTION = function(x, y) {
    return !(x | y);
};

var XNOR_FUNCTION = function(x, y) {
    return !(x ^ y);
};

OPERATIONS = {
  AND: AND_FUNCTION,
  OR: OR_FUNCTION,
  XOR: XOR_FUNCTION,
  NAND: NAND_FUNCTION,
  NOR: NOR_FUNCTION,
  XNOR: XNOR_FUNCTION,
  NOT: NOT_FUNCTION
};

IMAGE_FILES = {
  AND: 'resources/and.png',
  OR: 'resources/or.png',
  XOR: 'resources/xor.png',
  NAND: 'resources/nand.png',
  NOR: 'resources/nor.png',
  XNOR: 'resources/xnor.png',
  NOT: 'resources/not.png'
};