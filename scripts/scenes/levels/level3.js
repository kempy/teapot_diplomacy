var createLevelThreeFn = function(nextLevel) {
  var builder = new CircuitBuilder();
  var input1 = builder.addInput(); // 0
  var input2 = builder.addInput(); // 1
  var input3 = builder.addInput(); // 2
  var input4 = builder.addInput(); // 3
  var input5 = builder.addInput(); // 4
  var input6 = builder.addInput(); // 5
  var nandGate = builder.addBinaryGate('NAND', input1, input2); // 6
  var orGate = builder.addBinaryGate('OR', input3, input4); // 7
  var andGate = builder.addBinaryGate('AND', input5, input6); // 8
  // var andGate = builder.addBinaryOperator('AND'); // 2
  var output1 = builder.addOutput(nandGate, 1);
  var output2 = builder.addOutput(orGate, 1);
  var output3 = builder.addOutput(andGate, 1);
  var layoutPattern = [
    [input1.index, input2.index, input3.index, input4.index, input5.index, input6.index],
    [nandGate.index, orGate.index, andGate.index],
    [output1.index, output2.index, output3.index]
  ];
  builder.addLayoutPattern(layoutPattern);
  builder.addInputSet([0, 1, 0, 1, 1, 1]);
  builder.addInputSet([0, 0, 1, 0, 1, 1]);
  return builder.buildLevelInitFn(nextLevel);
};
