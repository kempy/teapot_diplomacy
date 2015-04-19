var initDemoLevel = function(level) {
  var stage = level.stage;
  var operator = createOperator(50, 100);
  var otherOperator = createOperator(50, 200);
  var gate = new Gate(150, 150);
  var otherGate = new Gate(150, 50);
  stage.addChild(gate.shape);
  stage.addChild(otherGate.shape);
  stage.addChild(operator);
  stage.addChild(otherOperator);
  // Register all gates on the stage.
  stage.gates = [gate, otherGate];
};
