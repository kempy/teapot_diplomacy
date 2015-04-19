var moved = false;

var createOperator = function() {
  var block = createBlock(); 
  block.on('pressmove', function(evt) {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    printed = false;
  });
  block.on('pressup', function(evt) {
    // TODO: add snap code.
    console.log('press up');
  });
  return block;
};

var checkIntersection  = function(operator, gate) {
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

/**
 * Create block shape.
 */
var createBlock = function() {
  var block = new createjs.Shape();
  block.graphics.beginFill('DeepSkyBlue').drawRect(0, 0, 50, 50);
  block.x = 100;
  block.y = 100;
  block.regX = 25;
  block.regY = 25;
  block.setBounds(0, 0, 50, 50);
  return block;
};
