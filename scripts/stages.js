function makeStageManager() {
	currentStage = null;
	self = null;
	sm = {
		stages: {},
		currentStage: function() {
			return currentStage;
		},
		currentStageName: function() {
			if (self.currentStage()) {
				return currentStage.name;
			}
			return '';
		},
		getStage: function(name) {
			return self.stages[name];
		},
		createStage: function (name) {
			stage = {
				name: name,
				stage: new createjs.Stage('mainCanvas'),
				tick: function() {},
			};
			self.stages[name] = stage;
			return stage;
		},
		swapStage: function (stage) {
			if (currentStage) {
				currentStage.stage.enableDOMEvents(false);
				currentStage.stage.clear();
				currentStage = null;
			}
			stage.stage.clear();
			stage.stage.enableDOMEvents(true);
			currentStage = stage;
		},
		init: function() {
			createjs.Ticker.addEventListener("tick", self.renderStage);
		},
		renderStage: function () {
			if (currentStage) {
				currentStage.stage.update();
				if (currentStage.tick) {
					currentStage.tick();
				}
			}
		}
	}
	self = sm;
	return sm;
}

