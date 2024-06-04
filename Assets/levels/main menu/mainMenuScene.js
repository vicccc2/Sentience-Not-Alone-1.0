// main menu of game
class mainMenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'mainMenuScene'
    })
  }

  logo;

  preload = function() {
    this.load.image('logo', 'Assets/UI/Logo/logo.png');
    this.load.audio('mainMenuMusic', 'Assets/Audio/music/Mirror Lake.mp3');
    this.load.audio('select', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/01Contemporary/Menu/8BitRetroSFXPack1_Contemporary_Menu01.wav');
  }

  create = function() {
    //click for fullscreen
    this.input.on('pointerdown', () => {
      this.game.scale.startFullscreen();
    });

    music = this.sound.add('mainMenuMusic');
    music.play({
      volume: 0,
      loop: true
    });

    this.selectSound = this.sound.add("select");

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 5000
    });

    // zKey to interact and continue/start game
    zKey = this.input.keyboard.addKey('z');

    cursors = this.input.keyboard.createCursorKeys();

    // logo
    this.logo = this.add.image(256, 96, 'logo');

    // zKey
    this.startText = this.add.text(180, 144, '        [z] to Start', {
      fontSize: '16px',
      fontFamily: 'c64esque',
      color: '#FFF',
      lineSpacing: 6,
      align: 'center'
    }).setVisible(true).setColor('#0000FF');

    this.controlsText = this.add.text(180, 154, '        [z] Controls', {
      fontSize: '16px',
      fontFamily: 'c64esque',
      color: '#FFF',
      lineSpacing: 6,
      align: 'center'
    }).setVisible(true);

    this.creditsText = this.add.text(180, 164, '      [z] for credits', {
      fontSize: '16px',
      fontFamily: 'c64esque',
      color: '#FFF',
      lineSpacing: 6,
      align: 'center'
    }).setVisible(true);

    this.masterVolume = this.add.text(180, 174, ' [<] Master Volume: ' + (10 * masterVolume) + ' [>]', {
      fontSize: '16px',
      fontFamily: 'c64esque',
      color: '#FFF',
      lineSpacing: 6,
      align: 'center'
    }).setVisible(true);

    this.currentText = 0;
    this.creditsActive = false;
    this.controlsActive = false;

    this.textArray = [this.startText, this.controlsText, this.creditsText, this.masterVolume, this.musicVolume, this.soundEffectsVolume]

    // credits
    this.credits = this.add.text(16, 16, 'Credits:\nEngine: Phaser 3\nProgrammer/Designer/Artist: TheDireRaven\nMusic: “Christmas synths” by 3xBlast on SoundCloud licensed CC0\n“Fast Mystery” by Dizzy Crow licensed CC0\n“Mirror Lake” by @Joth_Music on Twitter licensed CC0\n“Near and Far” by @Joth_Music on Twitter licensed CC0\n“Pixel_sprinter” by Zane Little Music, Zane Little on Ko-fi licensed CC0\nSoundEffects: “8-Bit Retro Game SFX Pack” by David Dumais Audio\nlicensed Single Entity Standard Unity Asset Store EULA\nFonts: “c64esque” by andraaspar licensed CC0', {
      fontSize: '16px',
      fontFamily: 'c64esque',
      color: '#FFF',
      lineSpacing: 6,
      align: 'left'
    }).setVisible(false);

    // controls
    this.controls = this.add.text(90, 144, 'Controls:\nmove/aim: arrow keys\ninteract: down arrow key\nshoot: x\njump/continue: z\nfullscreen: click screen', {
      fontSize: '16px',
      fontFamily: 'c64esque',
      color: '#FFF',
      lineSpacing: 6,
      align: 'left'
    }).setVisible(false);

    this.menuDelay = false;
  }

  update = function() {
    if (this.creditsActive === true) {
      if (zKey.isDown) {
        this.logo.setVisible(true);
        this.credits.setVisible(false);
        this.controlsText.setVisible(true);
        this.startText.setVisible(true);
        this.creditsText.setVisible(true);
        this.masterVolume.setVisible(true);
        this.menuDelay = false;
        this.time.delayedCall(100, this.deactivateCredits, [], this);
      }
    }
    else if (this.controlsActive === true) {
      if (zKey.isDown) {
        this.controls.setVisible(false);
        this.controlsText.setVisible(true);
        this.startText.setVisible(true);
        this.creditsText.setVisible(true);
        this.masterVolume.setVisible(true);
        this.menuDelay = false;
        this.time.delayedCall(100, this.deactivateControls, [], this);
      }
    }
    else if ((this.controlsActive === false && this.creditsActive === false)) {
      if (this.menuDelay === false) {
        if (cursors.down.isDown && this.currentText < 3) {
          this.selectSound.play({
            volume: soundEffectsVolume,
            loop: false
          });
          this.textArray[this.currentText].setColor('#FFF');
          this.currentText += 1;
          this.textArray[this.currentText].setColor('#0000FF');
          this.menuDelay = true;
          this.time.delayedCall(100, this.delayMenu, [], this);
        }
        else if (cursors.up.isDown && this.currentText > 0) {
          this.selectSound.play({
            volume: soundEffectsVolume,
            loop: false
          });
          this.textArray[this.currentText].setColor('#FFF');
          this.currentText -= 1;
          this.textArray[this.currentText].setColor('#0000FF');
          this.menuDelay = true;
          this.time.delayedCall(100, this.delayMenu, [], this);
        }
        else {
          if (zKey.isDown && this.textArray[this.currentText] === this.startText) {
            music.stop();
            this.scene.start('Cutscene1');
          }
          else if (zKey.isDown && (this.textArray[this.currentText] === this.creditsText && this.creditsActive === false)) {
            this.logo.setVisible(false);
            this.credits.setVisible(true);
            this.startText.setVisible(false);
            this.creditsText.setVisible(false);
            this.masterVolume.setVisible(false);
            this.controlsText.setVisible(false);
            this.menuDelay = true;
            this.time.delayedCall(800, this.activateCredits, [], this);
          }
          else if (zKey.isDown && (this.textArray[this.currentText] === this.controlsText && this.controlsActive === false)) {
            this.controls.setVisible(true);
            this.startText.setVisible(false);
            this.creditsText.setVisible(false);
            this.masterVolume.setVisible(false);
            this.controlsText.setVisible(false);
            this.menuDelay = true;
            this.time.delayedCall(800, this.activateControls, [], this);
          }
        }

      }
    }

    if (this.textArray[this.currentText] === this.masterVolume) {
      if (cursors.left.isDown && masterVolume > 0.2) {
        this.selectSound.play({
          volume: soundEffectsVolume,
          loop: false
        });
        masterVolume -= 0.1;
        this.updateVolume();
        this.tweens.add({
          targets: music,
          volume: musicVolume,
          duration: 1000
        });

        this.masterVolume.setText(' [<] Master Volume: ' + (10 * Phaser.Math.RoundTo(masterVolume, -2)) + ' [>]');
      }
      else if (cursors.right.isDown && masterVolume < 1) {
        this.selectSound.play({
          volume: soundEffectsVolume,
          loop: false
        });
        masterVolume += 0.1;
        this.updateVolume();
        this.tweens.add({
          targets: music,
          volume: musicVolume,
          duration: 1000
        });

        this.masterVolume.setText(' [<] Master Volume: ' + (10 * Phaser.Math.RoundTo(masterVolume, -2)) + ' [>]');
      }
    }
  }

  delayMenu() {
    this.menuDelay = false
  }

  activateCredits() {
    this.creditsActive = true
  }

  activateControls() {
    this.controlsActive = true;
  }

  deactivateControls() {
    this.controlsActive = false;
  }

  deactivateCredits() {
    this.creditsActive = false;
  }

  updateVolume() {
    musicVolume = defaultMusicVolume * masterVolume;
    soundEffectsVolume = (defaultSoundEffectsVolume * masterVolume);
  }
}
