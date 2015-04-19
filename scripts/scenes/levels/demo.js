var initDemoLevel = function(level) {
  var stage = level.stage;
  var operator = new Operator('AND', 50, 100);
  var otherOperator = new Operator('OR', 50, 200);
  var gate = new Gate(150, 50);
  var otherGate = new Gate(110, 150);
  var line = gate.drawTo(otherGate);

  // Add all lines, then all gates, then all operators.
  stage.addChild(line);

  stage.addChild(gate.shape);
  stage.addChild(otherGate.shape);

  stage.addChild(operator.shape);
  stage.addChild(otherOperator.shape);
  
  // Register all gates on the stage.
  stage.gates = [gate, otherGate];

  var connection_points = ['a', 'b', 'c', 'gate1', 'gate2', 'output'];
  var circuit = [
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1]
  ];
};
