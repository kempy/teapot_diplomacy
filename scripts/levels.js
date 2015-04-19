function makeLevelManager() {
	currentLevel = null;
	self = null;
	sm = {
		levels: {},
		currentLevel: function() {
			return currentLevel;
		},
		currentLevelName: function() {
			if (self.currentLevel()) {
				return currentLevel.name;
			}
			return '';
		},
		getLevel: function(name) {
			return self.levels[name];
		},
		createLevel: function (name) {
			level = {
				name: name,
				stage: new createjs.Stage('mainCanvas'),
				tick: function() {},
			};
			self.levels[name] = level;
			return level;
		},
		swapLevel: function (name) {
			if (currentLevel) {
				currentLevel.stage.enableDOMEvents(false);
				currentLevel.stage.clear();
				currentLevel = null;
			}
			level = self.getLevel(name);
			level.stage.clear();
			level.stage.enableDOMEvents(true);
			currentLevel = level;
		},
		init: function() {
			createjs.Ticker.addEventListener("tick", self.renderLevel);
		},
		renderLevel: function () {
			if (currentLevel) {
				currentLevel.stage.update();
				if (currentLevel.tick) {
					currentLevel.tick();
				}
			}
		}
	}
	self = sm;
	return sm;
}

