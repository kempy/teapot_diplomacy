var createLevelTwoFn = function(nextLevel) {
  var builder = new CircuitBuilder();
  var input1 = builder.addInput(); // 0
  var input2 = builder.addInput(); // 1
  var andGate = builder.addBinaryGate('AND', input1, input2); // 2
  // var xor = builder.addBinaryOperator('XOR'); // 2
  var output = builder.addOutput(andGate, 1); // 3
  var layoutPattern = [
    [input1.index, input2.index],
    [andGate.index],
    [output.index]
  ];
  builder.addLayoutPattern(layoutPattern);
  builder.addInputSet([1, 1]);
  return builder.buildLevelInitFn(nextLevel);
};