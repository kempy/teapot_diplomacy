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
  endScreen = lm.createLevel('finish', createTextLevel);
  instructionsScreen = lm.createLevel('instructions', createTextLevel);
  startScreen = lm.createLevel('start', createTextLevel);
  startScreen.params.text = (
      "Teapot Diplomacy\n\n" +
      "Diplomacy can be the mechanism for starting or averting wars, sharing resources or hoarding them, and finding common ground.\n\n" +
      "Tea is a delicious beverage that can be a de-stressor, allowing for breaks in tense meetings, and a way to culturally and personally bond with our fellow humans in the room.\n\n" +
      "Unfortunately, our teapot broke! And it was never very good anyway. It overbrewed our green and Oolong teas and made weak black teas!\n\n" +
      "Oh, the crimes against humanity!\n\n" +
      "We're doing our part today to facilitate good negotiations and a positive outcome by providing a delicious respite. Conditions have to be perfect and all details managed. Because of that, we're making our teapot from scratch this time!\n\n" +
      "Connect the circuits together on this complicated teapot to brew the perfect cup for our diplomatic guests!\n\n" +
      "Click for instructions.");
  startScreen.params.nextLevel = 'instructions';
  instructionsScreen.params.text = (
      "Teapot Diplomacy Instructions\n\n" +
      "All of our inputs will be in binary — 1’s and 0’s. And we will use the following operators: NOT, AND, OR, NOR, NAND, XOR, XNOR.\n\n" +
      "By placing these operators in the correct gates on our circuit board, we’ll create the desired output — and hopefully eventually world peace.\n\n" +
      "Click to play.");
  instructionsScreen.params.nextLevel = 'demo';

  endScreen.params.text = (
      "Teapot Diplomacy\n\n" +
      "Our teapot is ready! We can now brew up a storm and make these diplomatic meetings a breeze!\n\n" +
      "Our first meeting has already been a success! Sample dialogue from said meeting:\n\n" +
      "Diplomat: 'This tea is delicious!'\n" +
      "Us: 'Thank you. We made it special for this meeting.'\n" +
      "Diplomat: 'Usually people steep Oolong for too long or boil it. This is brewed just perfectly.'\n" +
      "Us: 'Boiling Oolong! What a tragedy!'\n" +
      "Diplomat: 'On that I think we can agree.'\n" +
      "Us: 'So, on the issue we were just discussing...'\n" +
      "Diplomat: 'I think we have some wiggle room.'\n" +
      "Us: 'Excellent!'\n\n" +
      "So, as you can see, this teapot has been successful in its mission! Stay tuned for our next project, where we make the perfect travel coffee maker for archaeologists on digs, in order to facilitate alertness and advance science.\n\n" +
      "Teapot Diplomacy! An unexpected weapon for good!");
  endScreen.params.nextLevel = 'start';

  // Start at the demo level.
  lm.startLevel('start');
};