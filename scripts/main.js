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

  // Start at the demo level.
  lm.startLevel('demo');
};
