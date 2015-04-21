var createLevelSevenFn = function(nextLevel) {
  var builder = new CircuitBuilder();
  var input1 = builder.addInput(); // 0
  var input2 = builder.addInput(); // 1
  var input3 = builder.addInput(); // 2
  var input4 = builder.addInput(); // 3
  var and1 = builder.addBinaryGate('AND', input1, input2); // 4
  var and2 = builder.addBinaryGate('AND', input3, input4); // 5
  var nor1 = builder.addBinaryGate('NOR', and1, and2); // 6
  var output1 = builder.addOutput(nor1, 1);
  var layoutPattern = [
    [input1.index, input2.index, input3.index, input4.index],
    [and1.index, -1, and2.index],
    [nor1.index],
    [output1.index]
  ];
  builder.addLayoutPattern(layoutPattern);
  builder.addInputSet([1, 0, 1, 0]);
  builder.addInputSet([0, 1, 0, 1]);
  builder.addExtraOperator('NOR');
  builder.addExtraOperator('XOR');
  builder.addExtraOperator('XOR');
  return builder.buildLevelInitFn(nextLevel);
};

