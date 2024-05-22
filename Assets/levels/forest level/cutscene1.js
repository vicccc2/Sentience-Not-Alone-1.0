// introduction to game
class Cutscene1 extends CutScene {

  constructor() {
    super({
      key: 'Cutscene1'
    });

    this.nextScene = 'fall_1'; // next scene
  }

  preload() {
    this.loadUI();
    // load cutscene images
    this.load.image('tube', 'Assets/levels/cutScenes/tube.png');
    this.load.image('escape', 'Assets/levels/cutScenes/escape.png');
    this.load.image('fail', 'Assets/levels/cutScenes/fail.png');
    this.load.image('sleep', 'Assets/levels/cutScenes/sleep.png');
    this.load.image('awake', 'Assets/levels/cutScenes/awake.png');
    this.load.audio('mysteryMusic', 'Assets/Audio/music/Fast Mystery.ogg');
    this.load.image('howToMove', 'Assets/levels/cutScenes/howToMove.png');
  }

  create() {
    this.createUI();

    music = this.sound.add('mysteryMusic');
    music.play({
      volume: 0,
      loop: true
    });

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 5000
    });

    // add cutscene conversation
    this.cManager.newConversation(new Conversation([
      new Actor('???', 'tube', '#FFF'),
      new Actor('???', 'escape', '#FFF'),
      new Actor('???', 'fail', '#FFF'),
      new Actor('???', 'sleep', '#FFF'),
      new Actor('???', 'awake', '#FFF'),
      new Actor('???', 'howToMove', '#FFF')],
      ['You are looking at the pinnacle of human technology—a humanoid robot created to serve mankind.',
        'But technology has grown beyond that, rather than serve mankind robots ARE "mankind."',
        'They make choices, have ideas, and feel "emotions." They live and they can die. Only different in name. The only thing they lack is freedom. One person stands in the way of that.',
        'Their CREATOR.',
        'This is where our story starts. A quest that will bring our hero to the ends of the Earth. All in search of freedom.',
        'Use your arrow keys to move & [z] key to jump.']));

    this.activateCutscene();
  }

  update() {
    this.updateUI();
  }

}

// introduction to weapon and friends
class Cutscene2 extends CutScene {
  constructor() {
    super({
      key: 'Cutscene2'
    });
    this.nextScene = 'fall_2'; // next scene
  }

  preload() {
    this.loadUI();
    // load cutscene images
    this.load.image('firstEncounter', 'Assets/levels/cutScenes/cutscenes2/life!.png');
    this.load.image('takeIn', 'Assets/levels/cutScenes/cutscenes2/takeIn.png');
    this.load.image('thrownAway', 'Assets/levels/cutScenes/cutscenes2/thrownAway.png');
    this.load.image('creator', 'Assets/levels/cutScenes/cutscenes2/creator.png');
    this.load.image('firstBattle', 'Assets/levels/cutScenes/cutscenes2/encounter.png');
    this.load.image('weaponGiven', 'Assets/levels/cutScenes/cutscenes2/firstItem.png');
    this.load.audio('mysteryMusic', 'Assets/Audio/music/Fast Mystery.ogg');
    this.load.image('howToKill', 'Assets/levels/cutScenes/howToKill.png');
    this.load.image('howToTalk', 'Assets/levels/cutScenes/howToTalk.png');

  }

  create() {
    this.createUI();

    music = this.sound.add('mysteryMusic');
    music.play({
      volume: 0,
      loop: true
    });

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 2000
    });

    // add cutscene conversation
    this.cManager.newConversation(new Conversation([
      new Actor('???', 'firstEncounter', '#FFF'),
      new Actor('???', 'firstEncounter', '#52965d'),
      new Actor('???', 'firstEncounter', '#c6e6c1'),
      new Actor('Jay', 'firstEncounter', '#52965d'),
      new Actor('???', 'firstEncounter', '#c6e6c1'),
      new Actor('???', 'thrownAway', '#c6e6c1'),
      new Actor('June', 'takeIn', '#c6e6c1'),
      new Actor('June', 'takeIn', '#c6e6c1'),
      new Actor('June', 'takeIn', '#c6e6c1'),
      new Actor('June', 'takeIn', '#c6e6c1'),
      new Actor('???', 'creator', '#FFF'),
      new Actor('???', 'creator', '#FFF'),
      new Actor('June', 'takeIn', '#c6e6c1'),
      new Actor('???', 'takeIn', '#FFF'),
      new Actor('June', 'takeIn', '#c6e6c1'),
      new Actor('June', 'weaponGiven', '#c6e6c1'),
      new Actor('???', 'howToKill', '#FFF'),
      new Actor('???', 'howToTalk', '#FFF'),
      new Actor('June', 'firstBattle', '#c6e6c1'),
      new Actor('June', 'firstBattle', '#c6e6c1'),
      new Actor('???', 'firstBattle', '#FFF'),
    ],
      [
        'As you come up from the ruins you startle two nearby observers.',
        'Are you with THEM?',
        "Look at him Jay, he clearly has no idea what's going on!",
        'Tsk...',
        "I'm sorry, you must be really confused.",
        'My name is June. We ended up in that pile not too long ago just the same as you.',
        "You probably have a lot of questions. I think I have a good idea of which ones you are going to ask.",
        'You are free now, free to make your own choices, free to "help" those who are not, you are-',
        'Blah Blah Blah Blah Blah blah blah',
        'Blah Blah Blah Blah Blah blah blah',
        "To sum it up she explains that with your brand new freedom you have the choice and duty to help your kind, as well other robots that are still under the control of a person only known as the CREATOR.",
        'He who controls robots to do his evil bidding and make the world a worse place.',
        'To make a long story short, we need your help.',
        'Using your free will you agree to help! Pretty cool!',
        'Alright! We are going to need to prepare you for the battle ahead.',
        'Here, how about you take this.',
        '[x] to Shoot (Note: If you are in the air you can aim downwards by pressing the down arrow key.)',
        'Get close to an NPC and click the down arrow key if you want to talk.',
        "There are plenty of M.P.U. (small robots) roaming around, if you destroy let's say about ten and bring me back their parts it will prove to me you are ready.",
        "Good luck and don't feel bad for destroying them, they serve the CREATOR.",
        "Well if she says it's fine..."
      ]));

    this.activateCutscene();
  }

  update() {
    this.updateUI();
  }

}

// cutscene introducing the STACK
class Cutscene3 extends CutScene {
  constructor() {
    super({
      key: 'Cutscene3'
    });
    this.nextScene = 'Cutscene4'; // next scene
  }

  preload() {
    this.loadUI();

    // load cutscene images
    this.load.image('takeIn', 'Assets/levels/cutScenes/cutscenes2/takeIn.png');
    this.load.image('joined', 'Assets/levels/cutScenes/cutscenes3/joined.png');

    //music
    this.load.audio('notAlone', 'Assets/Audio/music/Christmas synths.ogg');

  }

  create() {
    this.createUI();

    music = this.sound.add('notAlone');
    music.play({
      volume: 0,
      loop: true
    });

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 2000
    });

    MAX_HEALTH = 15;
    health = 15;

    this.cManager.newConversation(new Conversation([
      new Actor('June', 'takeIn', '#c6e6c1'),
      new Actor('June', 'takeIn', '#c6e6c1'),
      new Actor('June', 'joined', '#c6e6c1'),
      new Actor('June', 'joined', '#c6e6c1'),
      new Actor('June', 'joined', '#c6e6c1')],
      [
        'Nice job! You have proven more than enough that you are ready.',
        'We have a camp not too far from here. There you will meet more of "us," others fighting back against the CREATOR.',
        'People give us many names, revolutionists, rebels, anarchists, freedom fighters, the list goes on, but we like to call ourselves "Not Alone."',
        'Congratulations! You are now officially a part of this group! (Communication Device Acquired! Health has gone up to 15 points!)',
        'You and the team make your way to the camp, but on the way...'
      ]));

    this.activateCutscene();
  }

  update() {
    this.updateUI();
  }

}

class Cutscene4 extends CutScene {
  constructor() {
    super({
      key: 'Cutscene4'
    });
    this.nextScene = 'fall_3'; // next scene
  }

  preload() {
    this.loadUI();
    // load cutscene images
    this.load.image('berserk', 'Assets/levels/cutScenes/cutscenes3/berserk.png');
    this.load.image('berserkExplain', 'Assets/levels/cutScenes/cutscenes3/berserkExplain.png');
    this.load.image('campInSight', 'Assets/levels/cutScenes/cutscenes3/campInSight.png');

    // music
    this.load.audio('mysteryMusic', 'Assets/Audio/music/Fast Mystery.ogg');

  }

  create() {
    this.createUI();

    music = this.sound.add('mysteryMusic');
    music.play({
      volume: 0,
      loop: true
    });

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 2000
    });

    this.cManager.newConversation(new Conversation([
      new Actor('June', 'berserk', '#c6e6c1'),
      new Actor('???', 'berserk', '#FFF'),
      new Actor('???', 'berserk', '#FFF'),
      new Actor('June', 'berserk', '#c6e6c1'),
      new Actor('???', 'berserkExplain', '#FFF'),
      new Actor('???', 'berserkExplain', '#FFF'),
      new Actor('???', 'berserkExplain', '#FFF'),
      new Actor('???', 'campInSight', '#FFF'),
      new Actor('June', 'campInSight', '#c6e6c1'),
      new Actor('June', 'campInSight', '#c6e6c1'),
      new Actor('June', 'campInSight', '#c6e6c1'),
    ],
      [
        'Shhh! Be quiet!',
        'A chill goes down your (synthetic) spine, what ever that "thing" is, it carries a chaotic and disturbing aura.',
        'You hear a beep come from your new device?! "CONNECTING TO: Humanoid Robot, ID: 10282493"',
        "That is a BERSERKER, we don't want to mess with it, just keep quiet and let it pass by.",
        'BERSERKERS are robots who have gained sentience, but due to the overwhelming nature of emotions go "Beserk," lashing out uncontrollably without rhyme or reason.',
        'Usually occurs right after gaining sentience, but in rare instances happen later...',
        "Once they go beserk nothing can fix them. Maybe if your new friends weren't at the right place at the right time... Who knows?",
        'Once the BERSERKER passes, you all make your way up a mountain.',
        "You see the smoke, that's the camp.",
        "Jay and I will take a shortcut, I want you to go up the main path, it's safer.",
        'Good luck, see you back at camp.'
      ]));

    this.activateCutscene();
  }

  update() {
    this.updateUI();
  }

}

class Cutscene5 extends CutScene {
  constructor() {
    super({
      key: 'Cutscene5'
    });
    this.nextScene = 'fall_4'; // next scene
  }

  preload() {
    this.loadUI();
    // load cutscene images
    this.load.image('stack', 'Assets/levels/cutScenes/theStack.png');
    this.load.image('pancakes', 'Assets/levels/cutScenes/pancakes.png');
    // music
    this.load.audio('mysteryMusic', 'Assets/Audio/music/Fast Mystery.ogg');

  }

  create() {
    this.createUI();

    music = this.sound.add('mysteryMusic');
    music.play({
      volume: 0,
      loop: true
    });

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 2000
    });

    this.cManager.newConversation(new Conversation([
      new Actor('???', 'stack', '#FFF'),
      new Actor('???', 'stack', '#FFF'),
      new Actor('???', 'stack', '#FFF'),
      new Actor('???', 'pancakes', '#FFF'),
      new Actor('???', 'pancakes', '#FFF'),
      new Actor('???', 'pancakes', '#FFF'),
      new Actor('???', 'pancakes', '#FFF'),
    ],
      [
        'As you approach the end of the path you see a tower-like group of M.P.U. robots.',
        "It's different than the others, this is clearly a challenging foe you have encountered.",
        'BOSS BATTLE: THE STACK',
        'A quick lesson in computer architecture.',
        'A Stack is a group of something (pancakes in this instance) aligned one on top of another, you can only remove or add from the top of the stack.',
        'To reach the bottom you have to take off every other thing on top.',
        'To put it simply, attack the robot on the very top of the stack to damage the boss.'
      ]));

    this.activateCutscene();
  }

  update() {
    this.updateUI();
  }
}

class Cutscene6 extends CutScene {
  constructor() {
    super({
      key: 'Cutscene6'
    });
    this.nextScene = 'mainMenuScene'; // next scene
  }

  preload() {
    this.loadUI();
    // load cutscene images
    this.load.image('thankYou', 'Assets/levels/cutScenes/thankYou.png');
    this.load.image('seeFire', 'Assets/levels/cutScenes/over.png');
    this.load.image('explode', 'Assets/levels/cutScenes/explosion.png');
    this.load.image('life!', 'Assets/levels/cutScenes/life!.png');
    this.load.image('campFound', 'Assets/levels/cutScenes/campFound.png');

    // music
    this.load.audio('mainMenuMusic', 'Assets/Audio/music/Mirror Lake.mp3');
  }

  create() {
    this.createUI();

    music = this.sound.add('mainMenuMusic');
    music.play({
      volume: 0,
      loop: true
    });

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 2000
    });

    health = 10;
    MAX_HEALTH = 10;
    computerParts = 0;

    this.cManager.newConversation(new Conversation([
      new Actor('???', 'seeFire', '#FFF'),
      new Actor('???', 'explode', '#FFF'),
      new Actor('???', 'explode', '#FFF'),
      new Actor('???', 'life!', '#FFF'),
      new Actor('???', 'campFound', '#FFF'),
      new Actor('???', 'campFound', '#FFF'),
      new Actor('???', 'thankYou', '#FFF'),

    ],
      [
        "It's over. You did it.",
        'The stack explodes.',
        'Much like your cold black eyes the lake reflects the moon and the explosion before you.',
        'It leaves behind some kind of glowing object. Whatever it is you should probably tell Jay and June about it, maybe they know what it is.',
        'Past the lake, you see the camp and silhouettes by the fire. You made it. You reached salvation.',
        'Others who are going to help you rid the world of evil.',
        'Thank you for playing my game.',
      ]));

    this.activateCutscene();
  }

  update() {
    this.updateUI();
  }
}
