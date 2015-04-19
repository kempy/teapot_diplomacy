var init = function() {
  var stage = new createjs.Stage('mainCanvas');
  var operator = createOperator();
  var gate = createGate();
  stage.addChild(gate);
  stage.addChild(operator);

  // Register all gates on the stage.
  stage.gates = [];
  stage.gates[stage.gates.length] = gate;
  stage.update();
  function handleTick(event) {
    stage.update();
  }
  createjs.Ticker.addEventListener('tick', handleTick);
};
