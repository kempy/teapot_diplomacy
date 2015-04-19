var init = function() {
    SM = makeStageManager();
    window.teapot.StageManager = SM;
    stage1 = SM.createStage('one');
    stage2 = SM.createStage('two');
    circle1 = makeCircle('DeepSkyBlue');
    circle2 = makeCircle('Green');
    stage1.stage.addChild(circle1.object);
    console.log(circle1);
    stage1.tick = function() {
      bounceObject(circle1);
    };
    stage2.stage.addChild(circle2.object);
    console.log(circle2);
    stage2.tick = stageBouncerCreate(circle2);
    SM.init();
    SM.swapStage(stage1);
    setInterval(function () { switchStage(SM); }, 2000);
};

function switchStage(SM) {
  console.log(SM.stages);
  console.log(SM.currentStageName());
  if (SM.currentStageName() == 'one') {
    SM.swapStage(SM.getStage('two'));
  } else if (SM.currentStageName() == 'two') {
    SM.swapStage(SM.getStage('one'));
  }
}

function stageBouncerCreate(obj) {
  thing = obj; 
  return function() {
    bounceObject(thing);
  }
}

function bounceObject(obj) {
  if (obj.object.x > 200) {
    obj.direction = -1;
  }
  if (obj.object.x < 100) {
    obj.direction = 1;
  }
  obj.object.x += 5 * obj.direction;
}

function makeCircle(color) {
    var circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    return { object: circle,
             direction: 1};
}
