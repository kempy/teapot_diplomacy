var createLevelSixFn = function(nextLevel) {
  var builder = new CircuitBuilder();
  var input1 = builder.addInput(); // 0
  var input2 = builder.addInput(); // 1
  var input3 = builder.addInput(); // 2
  var input4 = builder.addInput(); // 3
  var input5 = builder.addInput(); // 4
  var input6 = builder.addInput(); // 5
  var or1 = builder.addBinaryGate('OR', input1, input2); // 6
  var or2 = builder.addBinaryGate('OR', input3, input4); // 7
  var xnor1 = builder.addBinaryGate('XNOR', input5, input6); // 8
  var output1 = builder.addOutput(or1, 1); // 9
  var output2 = builder.addOutput(or2, 1); // 10
  var output3 = builder.addOutput(xnor1, 1); // 11
  var layoutPattern = [
    [input1.index, input2.index, input3.index, input4.index, input5.index, input6.index],
    [or1.index, -1, or2.index, -1, xnor1.index],
    [output1.index, -1, output2.index, -1, output3.index]
  ];
  builder.addLayoutPattern(layoutPattern);
  builder.addInputSet([0, 1, 1, 0, 0, 0]);
  builder.addInputSet([1, 1, 0, 1, 1, 1]);
  builder.addExtraOperator('XNOR');
  builder.addExtraOperator('XNOR');
  builder.addExtraOperator('OR');
  return builder.buildLevelInitFn(nextLevel);
};
