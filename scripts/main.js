var init = function() {
  var stage = new createjs.Stage('mainCanvas');
  var operator = createOperator();
  var gate = createGate();
  stage.addChild(gate);
  stage.addChild(operator);
  stage.update();
  function handleTick(event) {
    stage.update();
    checkIntersection(operator, gate);
  }
  createjs.Ticker.addEventListener('tick', handleTick);
};
