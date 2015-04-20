var initDemoLevel = function(level) {
  var stage = level.stage;
  var operator = new Operator('AND', 50, 100);
  var otherOperator = new Operator('NOT', 50, 200);
  var gate = new Gate(150, 50);
  var otherGate = new Gate(110, 150);
  var input = new Input(100, 25);
  var otherInput = new Input(300, 25);
  var output = new Output(100, 250);

  var nodes = [input, otherInput, gate, otherGate, output];
  var circuit_matrix = [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0]
  ];

  var circuit = new Circuit(nodes, circuit_matrix);
  circuit.addConnections(stage);
  circuit.addNodes(stage);
  circuit.validateCircuit([0, 1]);
  stage.addChild(operator.shape);
  stage.addChild(otherOperator.shape);

  // Register all gates on the stage.
  stage.gates = [gate, otherGate];
  // Color some of them blue and some of them green.
  // circuit.colorConnections([0,1,1,0]);
};
