class CutScene extends Phaser.Scene {

  loadUI() {
    currentScene = this;

    this.load.image('PC_portrait', 'Assets/Sprites/Characters/player/pc_portrait.png');
    this.load.image('textBox', 'Assets/UI/Textboxes/textBox.png');
    this.load.audio('talk', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/01Contemporary/Menu/8BitRetroSFXPack1_Contemporary_Menu03.wav');
  }

  createUI() {

    //click for fullscreen
    this.input.on('pointerdown', () => {
      this.game.scale.startFullscreen();
    });

    // text interface of game
    textAudio = this.sound.add('talk');
    zKey = this.input.keyboard.addKey('z');
    xKey = this.input.keyboard.addKey('x');
    dKey = this.input.keyboard.addKey('d');

    cursors = this.input.keyboard.createCursorKeys();

    this.cManager = new cutsceneManager(new DialogueManager(this.add.image(256, 100, 'PC'), this.add.image(256, 240, 'textBox'), this.add.text(100, 205, '', {
      fontSize: '32px',
      fontFamily: 'c64esque',
      color: '#FFF',
      lineSpacing: 6,
    }), this.add.text(57, 205, '', {
      fontSize: '32px',
      fontFamily: 'c64esque',
      color: '#00FFFF',
      align: 'center'
    }), this.add.text(365, 260, '[Z]', {
      fontSize: '32px',
      fontFamily: 'c64esque',
      color: '#FFF',
      lineSpacing: 6
    }), textAudio, soundEffectsVolume * 0.2), zKey, this.nextScene);
  }

  activateCutscene() {
    this.cManager.activateCutscene(1);
  }

  updateUI() {
    this.cManager.listen();
  }


}