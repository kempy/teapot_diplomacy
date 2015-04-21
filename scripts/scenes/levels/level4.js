var createLevelFourFn = function(nextLevel) {
  var builder = new CircuitBuilder();
  var input1 = builder.addInput(); // 0
  var input2 = builder.addInput(); // 1
  var input3 = builder.addInput(); // 2
  var input4 = builder.addInput(); // 3
  var norGate = builder.addBinaryGate('NOR', input1, input2); // 6
  var xnorGate = builder.addBinaryGate('XNOR', input3, input4); // 7
  // var andGate = builder.addBinaryOperator('AND'); // 2
  var output1 = builder.addOutput(norGate, 1);
  var output2 = builder.addOutput(xnorGate, 1);
  var layoutPattern = [
    [input1.index, input2.index, input3.index, input4.index],
    [],
    [output1.index, output2.index]
  ];
  builder.addLayoutPattern(layoutPattern);
  builder.addInputSet([0, 0, 1, 1]);
  builder.addInputSet([0, 0, 1, 0]);
  return builder.buildLevelInitFn(nextLevel);
};
