var createLevelOneFn = function(nextLevel) {
  var builder = new CircuitBuilder();
  var input1 = builder.addInput(); // 0
  var notGate = builder.addUnaryGate('NOT', input1); // 1
  var output = builder.addOutput(notGate, 1); // 2
  var layoutPattern = [
    [input1.index],
    [notGate.index],
    [output.index]
  ];
  builder.addLayoutPattern(layoutPattern);
  builder.addInputSet([0]);
  return builder.buildLevelInitFn(nextLevel);
};