function createTextLevel(level) {
  var params = level.params;
  var text = params.text;
  var nextLevel = params.nextLevel;
  function makeRoundedRect(line, fill, size) {
    var g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke(line);
    g.beginFill(fill);
    g.drawRoundRect(0,0,size, size, 20);
    var shape = new createjs.Shape(g);
    return shape;

  }
  stage = level.stage;

  outerRect = makeRoundedRect('#708090', '#FFFFF0', 550);
  outerRect.x = 25;
  outerRect.y = 25;
  outerRect.addEventListener('click', function(event) {
      window.teapot.levelManager.startLevel(nextLevel);});
  stage.addChild(outerRect);
  text = new createjs.Text(text, '18px Arial', '#2F4F4F');
  text.x = 50;
  text.y = 50;
  text.lineWidth = 500;
  stage.addChild(text);

  var teapotImage = new createjs.Bitmap('resources/teapot.png');
  teapotImage.x = 392;
  teapotImage.y = 470;
  teapotImage.scaleX = 0.5;
  teapotImage.scaleY = 0.5;
  stage.addChild(teapotImage);
}
