var createGate = function(x, y) {
  var snapBox = new createjs.Shape();
  snapBox.graphics.beginStroke('Blue').drawRect(14, 14, 52, 52);
  snapBox.x = 150;
  snapBox.y = 150;
  snapBox.setBounds(0, 0, 80, 80)
  return snapBox;
};