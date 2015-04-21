var createLevelEightFn = function(nextLevel) {
  var builder = new CircuitBuilder();
  var input1 = builder.addInput(); // 0
  var input2 = builder.addInput(); // 1
  var input3 = builder.addInput(); // 2
  var andGate = builder.addBinaryGate('AND', input1, input2); // 3
  var nandGate = builder.addBinaryGate('NAND', input1, input2); // 4
  var xorGate = builder.addBinaryGate('XOR', nandGate, andGate); // 5
  // var notGate = builder.addUnaryGate('NOT', input3, true); // 6
  var andGate2 = builder.addBinaryGate('AND', xorGate, input3); // 6
  var output1 = builder.addOutput(andGate2, 1); // 7
  var layoutPattern = [
    [0, -1, -1, -1, 1, -1, 2],
    [-1, -1, -1, 3, -1, -1, -1],
    [-1, 4, -1, -1, -1, -1, -1],
    [-1, -1, 5, -1, -1, -1, -1],
    [-1, -1, -1, 6, -1, -1, -1],
    [-1, -1, -1, 7, -1, -1, -1],
  ];
  builder.addLayoutPattern(layoutPattern);
  builder.addInputSet([0, 0, 1]);
  builder.addInputSet([0, 1, 1]);
  builder.addInputSet([1, 0, 1]);
  builder.addInputSet([1, 1, 1]);
  return builder.buildLevelInitFn(nextLevel);
};
