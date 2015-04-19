var initDemoLevel = function(level) {
  var stage = level.stage;
  var operator = new Operator('AND', 50, 100);
  var otherOperator = new Operator('OR', 50, 200);
  var gate = new Gate(150, 50);
  var otherGate = new Gate(110, 150);
  var input = new Input(100, 25);
  var output = new Output(100, 250);

  var connection_points = {
    0: input,
    1: gate,
    2: otherGate,
    3: output
  };
  var circuit_matrix = [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 0]
  ];

  var circuit = new Circuit(connection_points, circuit_matrix);

  // Add all lines, then all gates, then all operators.
  lines = circuit.lines();
  for (var i = 0; i < lines.length; i++) {
    stage.addChild(lines[i]);
  }

  stage.addChild(input.shape);
  stage.addChild(gate.shape);
  stage.addChild(otherGate.shape);
  stage.addChild(output.shape);

  stage.addChild(operator.shape);
  stage.addChild(otherOperator.shape);

  // Register all gates on the stage.
  stage.gates = [gate, otherGate];
};
