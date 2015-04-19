var initDemoLevel = function(level) {
  var stage = level.stage;
  var operator = createOperator(50, 100);
  var otherOperator = createOperator(50, 200);
  var gate = createGate(150, 150);
  var otherGate = createGate(150, 50);
  stage.addChild(gate);
  stage.addChild(otherGate);
  stage.addChild(operator);
  stage.addChild(otherOperator);
  // Register all gates on the stage.
  stage.gates = [gate, otherGate];
};
