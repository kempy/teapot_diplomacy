window.teapot = { };
var init = function() {
		LM = makeLevelManager();
		window.teapot.LevelManager = LM;
		level1 = LM.createLevel('one');
		level2 = LM.createLevel('two');
		circle1 = makeCircle('DeepSkyBlue');
		circle2 = makeCircle('Green');
    level1.stage.addChild(circle1.object);
		console.log(circle1);
		level1.tick = function() {
			bounceObject(circle1);
		};
    level2.stage.addChild(circle2.object);
		console.log(circle2);
		level2.tick = stageBouncerCreate(circle2);
		LM.init();
		LM.swapLevel('one');
		setInterval(function () { switchLevel(LM); }, 2000);
};

function switchLevel(LM) {
	console.log(LM.levels);
	console.log(LM.currentLevelName());
	if (LM.currentLevelName() == 'one') {
		LM.swapLevel('two');
	} else if (LM.currentLevelName() == 'two') {
		LM.swapLevel('one');
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
