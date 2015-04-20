var InputSet = function(playableCircuit, input, index) {
  this.input = input;
  this.container = new createjs.Container();
  this.inputShapes = [];
  this.index = index;
  this.width = 200;
  this.height = 30;
  this.offset = 10;
  this.selectionShape = null;
  this.selected = false;
  this.playableCircuit = playableCircuit;
  this.checkMark = this.createImage('resources/checkmark.png');
  this.xMark = this.createImage('resources/x-mark.png');
};

InputSet.prototype.toggleSelection = function() {
  this.playableCircuit.selectInput(this.index);
}

InputSet.prototype.select = function() {
  this.selectionShape.shapeCommand.style = 'SlateGray';
  this.selected = true;
}

InputSet.prototype.deselect = function() {
  this.selectionShape.shapeCommand.style = 'LightGrey';
  this.selected = false;
}

InputSet.prototype.setStatus = function(b) {
  if (!b) {
    this.checkMark.alpha = 0;
    this.xMark.alpha = 1;
  } else {
    this.checkMark.alpha = 1;
    this.xMark.alpha = 0;
  }
}

InputSet.prototype.createImage = function(src) {
  var image = new createjs.Bitmap(src);
  return image;
}

InputSet.prototype.createContainer = function() {
  this.container.x = 550;
  this.container.y = (this.index * (this.height + this.offset));
  var increment = this.width / (this.input.length + 1);
  var margin = 6;
  var insideBackground = this.createBackgroundRectangle(
    margin / 2, margin / 2, this.width - margin, this.height - margin);
  var selectionBackground = this.createBackgroundRectangle(
    0, 0, this.width, this.height);
  this.selectionShape = selectionBackground;
  var that = this;
  this.selectionShape.on('click', function(evt) {
    that.toggleSelection(); 
  });
  this.container.addChild(selectionBackground);
  this.container.addChild(insideBackground);
  for (var i = 0; i < this.input.length; i++) {
    var x = increment * (i + 1);
    var y = this.height/2;
    var inputShape = this.createInputShape(x, y);
    this.inputShapes.push(inputShape);
    if (this.input[i] == 1) {
      inputShape.shapeCommand.style = GLOBALS.TRUE_COLOR;
    } else {
      inputShape.shapeCommand.style = GLOBALS.FALSE_COLOR;
    }
    this.container.addChild(inputShape);
  }
  this.checkMark.x = this.width;
  this.checkMark.y = 0;
  this.checkMark.scaleX = .3;
  this.checkMark.scaleY = .3;
  this.checkMark.alpha = 0;
  this.xMark.x = this.width;
  this.xMark.y = 0;
  this.xMark.scaleX = .3;
  this.xMark.scaleY = .3;
  this.container.addChild(this.checkMark);
  this.container.addChild(this.xMark);
}

InputSet.prototype.createBackgroundRectangle = function(x, y, width, height) {
  var inputShape = new createjs.Shape();
  var graphics = inputShape.graphics.beginFill('LightGrey');
  inputShape.shapeCommand = graphics.command;
  graphics.drawRect(x, y, width, height);
  return inputShape;
}

InputSet.prototype.createInputShape = function(x, y) {
  var inputShape = new createjs.Shape();
  var graphics = inputShape.graphics.beginFill('LightGrey');
  inputShape.shapeCommand = graphics.command;
  graphics.drawCircle(x, y, 5);
  return inputShape;
}

