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
  outerRect = makeRoundedRect('#00ffff', '#0099ff', 450);
  outerRect.x = 25;
  outerRect.y = 25;
  outerRect.addEventListener('click', function(event) {
      window.teapot.levelManager.startLevel(nextLevel);});
  stage.addChild(outerRect);
  text = new createjs.Text(text, '20px Arial', '#66ffff');
  text.x = 50;
  text.y = 50;
  text.lineWidth = 400;
  stage.addChild(text);
}
