var printed = false;

var createOperator = function(x, y) {
  var block = createBlock(x, y);

  block.on('pressmove', function(evt) {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    printed = false;
  });

  block.on('pressup', function(evt) {
    var operator = evt.target;
    var gates = evt.target.stage.gates;
    var noMatch = true;
    for (var i = 0; i < gates.length; i++) {
      if (checkIntersection(operator, gates[i]) && !gates[i].full()) {
        noMatch = false;
        snapToIntersection(evt.target, gates[i]);
      } else {
        if (gates[i].operator && (gates[i].operator.id == operator.id)) {
          gates[i].operator = null;
        }
      }
    };
    if (noMatch) {
      for (var i = 0; i < gates.length; i++) {
        if (gates[i].operator && (gates[i].operator.id == operator.id)) {
          gates[i].operator = null;
        }
      };
      snapToOriginalIntersection(operator, operator.starting);
    }
  });
  return block;
};

var checkIntersection = function(operator, gate) {
  var absoluteBounds = operator.getTransformedBounds();
  var absoluteCenterX = absoluteBounds.x + (absoluteBounds.width / 2);
  var absoluteCenterY = absoluteBounds.y + (absoluteBounds.height / 2);
  var centerBounds = new createjs.Rectangle(absoluteCenterX, absoluteCenterY);
  if (centerBounds.intersects(gate.getTransformedBounds())) {
    if (!printed) {
      console.log('Intersected!');
      printed = true;
    }
    return true;
  }
};

var snapToOriginalIntersection = function(operator, point) {
  operator.x = point.x
  operator.y = point.y
};

var snapToIntersection = function(operator, gate) {
  var bounds = gate.getTransformedBounds();
  gate.operator = operator;
  operator.x = bounds.x + (bounds.width / 2);
  operator.y = bounds.y + (bounds.height / 2);
};

/**
 * Create block shape.
 */
var createBlock = function(x, y) {
  var block = new createjs.Shape();
  block.graphics.beginFill('DeepSkyBlue').drawRect(0, 0, 50, 50);
  block.x = x;
  block.y = y;
  block.starting = { "x": x, "y": y };
  block.regX = 25;
  block.regY = 25;
  block.setBounds(0, 0, 50, 50);
  return block;
};
