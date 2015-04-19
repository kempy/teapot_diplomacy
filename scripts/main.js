window.teapot = { };
var teapot = window.teapot;

/**
 * Init function.
 */
teapot.init = function() {
  // Set up level manager.
  teapot.levelManager = makeLevelManager();
  var lm = teapot.levelManager;
  lm.init();

  // Create levels.
  lm.createLevel('demo', initDemoLevel);
  startScreen = lm.createLevel('start', createTextLevel);
  startScreen.params.text = (
      "                   Teapot Diplomacy\n\n\n\n\n\n\n\n\n\n        " +
      "              Click to play.");
  startScreen.params.nextLevel = 'demo';

  // Start at the demo level.
  lm.startLevel('start');
};
