var initDemoLevel = function(level) {
  var stage = level.stage;
  var operator = new Operator(50, 100);
  var otherOperator = new Operator(50, 200);
  var gate = new Gate(150, 150);
  var otherGate = new Gate(150, 50);
  stage.addChild(gate.shape);
  stage.addChild(otherGate.shape);
  stage.addChild(operator.shape);
  stage.addChild(otherOperator.shape);
  // Register all gates on the stage.
  stage.gates = [gate, otherGate];
};
