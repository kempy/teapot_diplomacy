var createGate = function(x, y) {
  var snapBox = new createjs.Shape();
  snapBox.graphics.beginStroke('Blue').drawRect(14, 14, 52, 52);
  snapBox.x = x;
  snapBox.y = y;
  snapBox.setBounds(0, 0, 80, 80)
  snapBox.operator = null;
  snapBox.full = function() {
    return !!(snapBox.operator);
  };
  return snapBox;
};
