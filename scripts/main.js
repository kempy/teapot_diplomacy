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
      "All of our inputs will be in binary: 1's and 0's. And we will use the following operators: NOT, AND, OR, NOR, NAND, XOR, XNOR.\n\n" +
      "By placing these operators in the correct gates on our circuit board, we'll create the desired output - and hopefully eventually world peace.\n\n" +
      "Click to play.");
  instructionsScreen.params.nextLevel = 'level3';

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

interstitialLevel1_2 = lm.createLevel('interstitialLevel1_2', createTextLevel);
interstitialLevel1_2.params.text = (
  "Congrats! You started the bunson burner.\n\n" +
  "In the next level, we'll need to accept valid temperatures for the given tea. Please set the gates.");
interstitialLevel1_2.params.nextLevel = 'level2';

interstitialLevel2_3 = lm.createLevel('interstitialLevel2_3', createTextLevel);
interstitialLevel2_3.params.text = (
  "Congrats! We can now accept different temperatures.\n\n" +
  "Now we need to adjust the burner when it hits the right temperature. Please set the gates.");

interstitialLevel3_4 = lm.createLevel('interstitialLevel3_4', createTextLevel);
interstitialLevel3_4.params.text = (
  "Congrats! We can now adjust the burner.\n\n" +
  "Next we need to weigh the tea. Please set the gates.");

interstitialLevel4_5 = lm.createLevel('interstitialLevel4_5', createTextLevel);
interstitialLevel4_5.params.text = (
  "Congrats! We weighed the tea.\n\n" +
  "Next we need to add the tea. Please set the gates.");

interstitialLevel5_6 = lm.createLevel('interstitialLevel5_6', createTextLevel);
interstitialLevel5_6.params.text = (
  "Congrats! We added the tea.\n\n" +
  "We need to start the timer so we don't steep too long. Please set the gates.");

interstitialLevel6_7 = lm.createLevel('interstitialLevel6_7', createTextLevel);
interstitialLevel6_7.params.text = (
  "Congrats! We started the timer.\n\n" +
  "We need the music on the timer to be soft and soothing, as opposed to jarring. Please set the gates.");

interstitialLevel7_8 = lm.createLevel('interstitialLevel7_8', createTextLevel);
interstitialLevel7_8.params.text = (
  "Congrats! We have melodic music.\n\n" +
  "Next we need to pour the tea. Please set the gates.");

interstitialLevel8_9 = lm.createLevel('interstitialLevel8_9', createTextLevel);
interstitialLevel8_9.params.text = (
  "Congrats! We can pour the tea.\n\n" +
  "Almost done! We need apply the filter, no matter whether it's large looseleaf or small. Please set the gates.");

  lm.createLevel('level1', createLevelOneFn('level2'));
  lm.createLevel('level2', createLevelTwoFn('level3'));
  lm.createLevel('level3', createLevelThreeFn('finish'));


  // Start at the demo level.
  lm.startLevel('start');
};
