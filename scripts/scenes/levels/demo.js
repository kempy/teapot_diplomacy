var initDemoLevel = function(level) {
  var stage = level.stage;
  var operator = new Operator('AND', 50, 100);
  var otherOperator = new Operator('NOT', 50, 200);
  var gate = new Gate(150, 50);
  var otherGate = new Gate(110, 150);
  var input = new Input(100, 25);
  var otherInput = new Input(300, 25);
  var output = new Output(100, 250);
  var lm = teapot.levelManager;

  var nodes = [input, otherInput, gate, otherGate, output];
  var circuit_matrix = [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0]
  ];

  var circuit = new Circuit(nodes, circuit_matrix);

  var layout = new CircuitLayout(0, -100, 600, 600);
  console.log('Laying out circuit!');
  layout.layoutCircuit(circuit, [[0, 1], [2], [3], [4], [], []]);
  circuit.addConnections(stage);
  circuit.addNodes(stage);

  var playableCircuit = new PlayableCircuit(
    [[1, 0], [0, 1]], [1], circuit);
  stage.addChild(operator.shape);
  stage.addChild(otherOperator.shape);
  playableCircuit.addInputSetsToStage(stage);

  // Register all gates on the stage.
  stage.gates = [gate, otherGate];
  stage.playableCircuit = playableCircuit;

  level.tick = function() {
    if (playableCircuit.done) {
      function nextStageFn(evt) {
        lm.startLevel('finish');
        evt.target.removeEventListener('stagemouseup', nextStageFn);
      };
      stage.addEventListener('stagemouseup', nextStageFn);
      playableCircuit.done = false;
    }
  }
};
