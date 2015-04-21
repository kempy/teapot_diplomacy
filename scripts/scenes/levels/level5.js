var createLevelFiveFn = function(nextLevel) {
  var builder = new CircuitBuilder();
  var input1 = builder.addInput(); // 0
  var input2 = builder.addInput(); // 1
  var orGate = builder.addBinaryGate('OR', input1, input2); // 3
  var output1 = builder.addOutput(orGate, 1);
  var layoutPattern = [
    [input1.index, input2.index],
    [orGate.index],
    [output1.index]
  ];
  builder.addLayoutPattern(layoutPattern);
  builder.addInputSet([0, 1]);
  builder.addInputSet([1, 0]);
  builder.addInputSet([1, 1]);
  builder.addExtraOperator('AND');
  return builder.buildLevelInitFn(nextLevel);
};

