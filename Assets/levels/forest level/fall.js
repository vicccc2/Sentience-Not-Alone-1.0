let spikeFall;
let stackResize = 0;
let lastStack = false;
let playerRunAnim;
let aimDownTexture;
let aimUpTexture;
let playerRunAnimFrames;
let runAnimKey;
let defaultTexture;

// the first playable section, you are sourounded by destroyed robot bodies that resemble you
class fall_1 extends UIScene {
  constructor() {
    super({
      key: 'fall_1'
    });
  }

  preload = function() {
    // music
    this.load.audio('snowMusic', 'Assets/Audio/music/Near and Far.mp3'); // in all forest level scenes

    // player
    this.load.image('PC_noWeapon', 'Assets/Sprites/Characters/player/pc_noWeapon.png');
    this.load.audio('damagePlayer', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/DamageDealtTaken/8BitRetroSFXPack1_Traditional_Damage10.wav');
    this.load.audio('jump', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/Jump/8BitRetroSFXPack1_Traditional_Jump02.wav');
    this.load.spritesheet(
      'runningPC_noWeapon',
      'Assets/Sprites/Characters/player/playerRun.png',
      {
        frameWidth: 10,
        frameHeight: 23,
        endFrame: 1
      }
    );
    this.load.image('aimDownNoWeapon', 'Assets/Sprites/Characters/player/aimDown_noWeapon.png');

    // BG
    this.load.image('moon', 'Assets/levels/forest level/tileset/moon.png'); // in all forest level scenes
    this.load.image('mountains', 'Assets/levels/forest level/mountains.png'); // in all forest level scenes

    // tile map
    this.load.image('tiles', 'Assets/levels/forest level/tileset/snowTileSet_Padded.png'); // in all forest level scenes
    this.load.tilemapTiledJSON('forestMap_1', 'Assets/levels/forest level/fall.json');

    this.load.image('aimUpNoWeapon', 'Assets/Sprites/Characters/player/aimUp_noWeapon.png');

    // UI  
    this.loadUI();
  }

  create() {

    aimDownTexture = 'aimDownNoWeapon';
    aimUpTexture = 'aimUpNoWeapon';

    diedSceneKey = 'fall_1';

    defaultTexture = 'PC_noWeapon';

    playerRunAnimFrames = this.anims.generateFrameNumbers(
      'runningPC_noWeapon',
      {
        default: 0,
        start: 0,
        end: 1,
        first: 1
      }
    );

    playerRunAnimFrames = this.anims.create(
      {
        key: 'running-Anim',
        frames: playerRunAnimFrames,
        frameRate: 4,
        repeat: -1,
        yoyo: true
      }
    );

    runAnimKey = 'running-Anim';

    // music
    music = this.sound.add('snowMusic');
    music.play({
      volume: 0,
      loop: true
    });

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 2000
    });

    // BG
    this.add.image(256, 144, 'moon').setScrollFactor(0);
    this.add.tileSprite(0, 80, 5120, 512, 'mountains').setScrollFactor(0.3, 0.1);

    // tile map
    let mymap = this.make.tilemap({ key: "forestMap_1" });
    let mytileset = mymap.addTilesetImage("snowTileSet", "tiles", 16, 16, 1, 2);

    let mybelowlayer1 = mymap.createLayer("trees 1", mytileset, 0, 0);
    let mybelowlayer2 = mymap.createLayer("trees 2", mytileset, 0, 0);
    let myicelayer = mymap.createLayer("ice", mytileset, 0, 0);
    let myworldlayer = mymap.createLayer("map", mytileset, 0, 0);

    myworldlayer.setCollisionByProperty({ collides: true });
    // real scene make ice slippery
    myicelayer.setCollisionByProperty({ collides: true });

    // player
    player = new Player(368, 725, 'PC_noWeapon', 'jump', 'damagePlayer');

    this.physics.add.collider(player.sprite, myworldlayer);
    this.physics.add.collider(player.sprite, myicelayer);

    // no weapon skip

    // camera   
    camera = this.cameras.main;
    camera.startFollow(player.cameraBox, false, 1, 1, 0, 0);
    this.cameras.main.setBounds(0, 0, 1360, 784 - 2);
    this.physics.world.setBounds(0, 0, 1360, 784 - 2);

    // overlap zone to next scene
    this.nextSceneZone = this.add.zone(1360, 784, 32, 784);
    this.physics.add.existing(this.nextSceneZone, false);
    this.nextSceneZone.body.moves = false;
    this.physics.add.overlap(player.sprite, this.nextSceneZone, function() {
      // goes to the next scene
      music.stop();
      currentScene.scene.start('Cutscene2');
    });
    // creates UI
    this.createUI(); // always at the end

    // no conversations to be made here

  }

  update = function() {
    player.updatePlayer();
    //this.updateUI();
  }
}

// obtain weapon and explore the main part of the level
class fall_2 extends UIScene {

  constructor() {
    super({
      key: 'fall_2'
    });
  }



  preload = function() {
    // music
    this.load.audio('snowMusic', 'Assets/Audio/music/Near and Far.mp3');

    //characters
    this.load.image('PC', 'Assets/Sprites/Characters/player/pc.png');
    this.load.image('aimDown', 'Assets/Sprites/Characters/player/playerAimDown1.png');

    this.load.spritesheet(
      'runningPC',
      'Assets/Sprites/Characters/player/pcRun.png',
      {
        frameWidth: 20,
        frameHeight: 23,
        endFrame: 1
      }
    );

    this.load.image('june', 'Assets/Sprites/Characters/june/june_portrait.png');
    this.load.image('juneSprite', 'Assets/Sprites/Characters/june/june.png');

    this.load.image('jay', 'Assets/Sprites/Characters/john/john_portrait.png');
    this.load.image('jaySprite', 'Assets/Sprites/Characters/john/john.png');


    // BG
    this.load.image('moon', 'Assets/levels/forest level/tileset/moon.png');
    this.load.image('mountains', 'Assets/levels/forest level/mountains.png');

    // tile map
    this.load.image('tiles', 'Assets/levels/forest level/tileset/snowTileSet_Padded.png');
    this.load.tilemapTiledJSON('map', 'Assets/levels/forest level/tileset/forest.json');

    // bullet
    this.load.image('laser', 'Assets/Sprites/weapons/laser.png');
    this.load.audio('laserSound', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/Weapons/Gun/8BitRetroSFXPack1_Traditional_Weapon_Gun09.wav');
    this.load.audio('damage', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/DamageDealtTaken/8BitRetroSFXPack1_Traditional_Damage10.wav');
    this.load.audio('jump', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/Jump/8BitRetroSFXPack1_Traditional_Jump02.wav');

    // enemies
    this.load.image('enemy', 'Assets/Sprites/enemies/MPU/MPU.png');
    this.load.image('enemyDamaged', 'Assets/Sprites/enemies/MPU/MPU_damaged.png')
    this.load.audio('explode', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/01Contemporary/Explosions/8BitRetroSFXPack1_Contemporary_Explosion03.wav');

    // item
    this.load.image('part', 'Assets/Sprites/enemies/MPU/part.png');
    this.load.audio('pickUp', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/Item PickUp/8BitRetroSFXPack1_Traditional_ItemPickUp40.wav');

    this.load.image('aimUp', 'Assets/Sprites/Characters/player/aimUp.png');

    // UI  
    this.loadUI();
  }

  jay = new Actor('Jay', 'jay', '#52965d');
  jaySprite;
  june = new Actor('June', 'june', '#c6e6c1');
  juneSprite;

  create = function() {
    aimDownTexture = 'aimDown';

    aimUpTexture = 'aimUp';

    defaultTexture = 'PC';

    playerRunAnimFrames = this.anims.generateFrameNumbers(
      'runningPC',
      {
        default: 0,
        start: 0,
        end: 1,
        first: 1
      }
    );

    playerRunAnimFrames = this.anims.create(
      {
        key: 'runningPCAnim',
        frames: playerRunAnimFrames,
        frameRate: 4,
        repeat: -1,
        yoyo: true
      }
    );

    runAnimKey = 'runningPCAnim';

    diedSceneKey = 'fall_2';
    // music

    music = this.sound.add('snowMusic');
    music.play({
      volume: 0,
      loop: true
    });

    // enemy death sound
    this.pickUp = this.sound.add('pickUp');
    this.deathSound = this.sound.add('explode');

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 2000
    });

    // BG
    this.add.image(256, 144, 'moon').setScrollFactor(0);
    this.add.tileSprite(0, 80, 5120, 512, 'mountains').setScrollFactor(0.3, 0.1);

    // tile map
    let mymap = this.make.tilemap({ key: "map" });
    let mytileset = mymap.addTilesetImage("snowTileSet", "tiles", 16, 16, 1, 2);

    let mybelowlayer1 = mymap.createLayer("trees 1", mytileset, 0, 0);
    let mybelowlayer2 = mymap.createLayer("trees 2", mytileset, 0, 0);
    let myworldlayer = mymap.createLayer("map", mytileset, 0, 0);

    myworldlayer.setCollisionByProperty({ collides: true });

    // characters
    this.juneSprite = this.physics.add.sprite(1468, 660 - 2, 'juneSprite');
    this.jaySprite = this.physics.add.sprite(1510, 660 - 2, 'jaySprite');
    this.jaySprite.body.setAllowGravity(false);
    this.juneSprite.body.setAllowGravity(false);

    // player
    player = new Player(1409, 709, 'PC', 'jump', 'damage');

    this.physics.add.collider(player.sprite, myworldlayer);

    // player's weapon
    weapon1 = new Weapon(this.physics.add.group({
      defaultKey: 'laser',
      maxSize: 10,
    }), 1, 300, 100, 500, 100, 'laserSound');

    this.physics.add.collider(weapon1.bullets, myworldlayer, function(bullet, world) {
      weapon1.shootOver(bullet);
      //world.destroy();
    });

    // add overlap with NPCS
    this.physics.add.overlap(player.sprite, this.jaySprite, function(p, john) {
      if (p.body.blocked.down === true) {
        conversationManager.listen(1);
      }
    });
    this.physics.add.collider(this.jaySprite, myworldlayer);

    this.physics.add.overlap(player.sprite, this.juneSprite, function(p, june) {
      if (computerParts >= 10) {
        music.stop();
        currentScene.scene.start('Cutscene3');
      }

      if (p.body.blocked.down === true) {
        conversationManager.listen(2);
      }
    });
    this.physics.add.collider(this.juneSprite, myworldlayer);


    // enemy
    enemies = this.physics.add.group({
      defaultKey: 'enemy',
      maxSize: 30,
    });

    this.physics.add.collider(enemies, myworldlayer);
    this.physics.add.collider(enemies, enemies);
    this.physics.add.collider(player.sprite, enemies, function(p, enemy) {
      player.damagePlayer(1);
    });

    for (let i = 0; i < 11; i++) {
      let enemySpawn = mymap.findObject("enemySpawnPoints", obj => obj.name === ("spawn" + (1 + i)));
      let en = enemies.get();
      en.x = enemySpawn.x
      en.y = enemySpawn.y - 8;
      if (en) {
        en.health = 2;
        en.setActive(true);
        en.setVisible(true);
        en.body.setAllowGravity(true);
        en.setCollideWorldBounds(true);
        en.body.onWorldBounds = true;
      }
    }

    // collectibles
    parts = this.physics.add.group({
      defaultKey: 'part',
      maxSize: 20
    });

    this.physics.add.collider(parts, myworldlayer);
    this.physics.add.overlap(parts, player.sprite, function(p, part) {
      computerParts += 1;
      computerPartsText.setText('Parts: ' + computerParts);
      part.destroy();
      currentScene.pickUp.play({
        volume: soundEffectsVolume,
        loop: false
      });
    });

    this.physics.add.overlap(weapon1.bullets, enemies, function(bullet, enemy) {
      enemy.health -= 1;
      weapon1.shootOver(bullet);
      currentScene.deathSound.play({
        volume: soundEffectsVolume,
        loop: false
      });

      if (enemy.health <= 0) {
        let part = parts.get();
        if (part) {
          part.x = enemy.x;
          part.y = enemy.y;

        }
        enemy.destroy(0);
      }
      else {
        enemy.setSize(16, 12).setOffset(0, 4);
        enemy.setTexture('enemyDamaged');
      }
    });

    // camera   
    camera = this.cameras.main;
    camera.startFollow(player.cameraBox, false, 1, 1, 0, 0);
    this.cameras.main.setBounds(0, 0, 2864, 784 - 2);
    this.physics.world.setBounds(0, 0, 2864, 784 - 2);

    // creates UI
    this.createUI(); // always at the end

    // converastions
    conversationManager.newConversation(new Conversation([this.jay, this.jay], ['What?', "..."]));
    conversationManager.newConversation(new Conversation([this.june, this.june], ['Do you have the parts yet?', 'Come talk to me when your done.']));

  }

  update = function() {
    enemies.children.iterate(function(en) {
      if (Phaser.Math.Distance.Between(en.x, en.y, player.sprite.x, player.sprite.y) < 200) {
        if (player.sprite.x > en.x) {
          en.flipX = true;
          en.setVelocityX(60);
        }
        else if (player.sprite.x < en.x) {
          en.flipX = false;
          en.setVelocityX(-60);
        }
      }
      else {
        en.setVelocityX(0);
      }
    });
    weapon1.listen();
    player.updatePlayer();
    //this.updateUI();

    if ((player.sprite.x > this.juneSprite.x) && Phaser.Math.Distance.BetweenPoints(player.sprite, this.juneSprite) < 80) {
      this.juneSprite.flipX = false;
    }
    else {
      this.juneSprite.flipX = true;
    }

    if ((player.sprite.x > this.jaySprite.x) && Phaser.Math.Distance.BetweenPoints(player.sprite, this.jaySprite) < 80) {
      this.jaySprite.flipX = false;
    }
    else {
      this.jaySprite.flipX = true;
    }
  }

}

// spike level
class fall_3 extends UIScene {

  constructor() {
    super({
      key: 'fall_3'
    });
  }



  preload = function() {
    // music
    this.load.audio('snowMusic', 'Assets/Audio/music/Near and Far.mp3');

    //characters
    this.load.image('PC_com', 'Assets/Sprites/Characters/player/pc_com.png');

    // BG
    this.load.image('moon', 'Assets/levels/forest level/tileset/moon.png');
    this.load.image('mountains', 'Assets/levels/forest level/mountains.png');

    // tile map
    this.load.image('tiles', 'Assets/levels/forest level/tileset/snowTileSet_Padded.png');
    this.load.tilemapTiledJSON('mapSpike', 'Assets/levels/forest level/path.json');

    // bullet
    this.load.image('laser', 'Assets/Sprites/weapons/laser.png');
    this.load.audio('laserSound', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/Weapons/Gun/8BitRetroSFXPack1_Traditional_Weapon_Gun09.wav');
    this.load.audio('damage', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/DamageDealtTaken/8BitRetroSFXPack1_Traditional_Damage10.wav');
    this.load.audio('jump', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/Jump/8BitRetroSFXPack1_Traditional_Jump02.wav');

    // enemies
    this.load.image('enemy', 'Assets/Sprites/enemies/MPU/MPU.png');
    this.load.image('enemyDamaged', 'Assets/Sprites/enemies/MPU/MPU_damaged.png')
    this.load.audio('explode', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/01Contemporary/Explosions/8BitRetroSFXPack1_Contemporary_Explosion03.wav');
    this.load.image('spike', 'Assets/levels/forest level/spike.png');
    this.load.audio('spikeFall', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/Misc/8BitRetroSFXPack1_Traditional_Misc06.wav');

    // spike

    // item
    this.load.image('part', 'Assets/Sprites/enemies/MPU/part.png');
    this.load.audio('pickUp', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/Item PickUp/8BitRetroSFXPack1_Traditional_ItemPickUp40.wav');

    // UI  
    this.loadUI();

    // player animations
    this.load.image('newAimDown', 'Assets/Sprites/Characters/player/playerAimDownNew.png');
    this.load.image('newAimUp', 'Assets/Sprites/Characters/player/aimUpNew.png');
    this.load.spritesheet(
      'newRun',
      'Assets/Sprites/Characters/player/pc_comRun.png',
      {
        frameWidth: 23,
        frameHeight: 23,
        endFrame: 1
      }
    );
  }

  spikes;
  create = function() {

    aimDownTexture = 'newAimDown';
    aimUpTexture = 'newAimUp';

    diedSceneKey = 'fall_1';

    defaultTexture = 'PC_com';

    playerRunAnimFrames = this.anims.generateFrameNumbers(
      'newRun',
      {
        default: 0,
        start: 0,
        end: 1,
        first: 1
      }
    );

    playerRunAnimFrames = this.anims.create(
      {
        key: 'newRunCom',
        frames: playerRunAnimFrames,
        frameRate: 4,
        repeat: -1,
        yoyo: true
      }
    );

    runAnimKey = 'newRunCom';


    diedSceneKey = 'fall_3';
    // music

    music = this.sound.add('snowMusic');
    music.play({
      volume: 0,
      loop: true
    });

    spikeFall = this.sound.add('spikeFall');

    // enemy death sound
    this.pickUp = this.sound.add('pickUp');
    this.deathSound = this.sound.add('explode');

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 2000
    });

    // BG
    this.add.image(256, 144, 'moon').setScrollFactor(0);
    this.add.tileSprite(0, 80, 5120, 512, 'mountains').setScrollFactor(0.3, 0.1);

    // tile map
    let mymap = this.make.tilemap({ key: "mapSpike" });
    let mytileset = mymap.addTilesetImage("snowTileSet", "tiles", 16, 16, 1, 2);

    let mybelowlayer1 = mymap.createLayer("trees 1", mytileset, 0, 0);
    let mybelowlayer2 = mymap.createLayer("trees 2", mytileset, 0, 0);
    let myworldlayer = mymap.createLayer("map", mytileset, 0, 0);

    myworldlayer.setCollisionByProperty({ collides: true });

    // player
    player = new Player(16, 165, 'PC_com', 'jump', 'damage');

    this.physics.add.collider(player.sprite, myworldlayer);

    // player's weapon
    weapon1 = new Weapon(this.physics.add.group({
      defaultKey: 'laser',
      maxSize: 10,
    }), 1, 300, 100, 500, 100, 'laserSound');

    this.physics.add.collider(weapon1.bullets, myworldlayer, function(bullet, world) {
      weapon1.shootOver(bullet);
      //world.destroy();
    });

    this.nextSceneZone = this.add.zone(3856, 784, 32, 784);
    this.physics.add.existing(this.nextSceneZone, false);
    this.nextSceneZone.body.moves = false;
    this.physics.add.overlap(player.sprite, this.nextSceneZone, function() {
      // goes to the next scene
      music.stop();
      currentScene.scene.start('Cutscene5');
    });

    //spikes
    this.spikes = this.physics.add.group({
      defaultKey: 'spike',
      maxSize: 30,
    });

    this.physics.add.collider(this.spikes, myworldlayer, function(spike, world) {
      spikeFall.play({
        volume: soundEffectsVolume,
        loop: false
      });
      spike.destroy();
    });
    this.physics.add.collider(player.sprite, this.spikes, function(p, spike) {
      spikeFall.play({
        volume: soundEffectsVolume,
        loop: false
      });

      player.damagePlayer(1);
      spike.destroy();
    });

    for (let i = 0; i < 22; i++) {
      let enemySpawn = mymap.findObject("spikeSpawnPoints", obj => obj.name === ("spike" + (1 + i)));
      let en = this.spikes.get();
      en.x = enemySpawn.x + 8;
      en.y = enemySpawn.y - 8;
      if (en) {
        en.health = 2;
        en.setActive(true);
        en.setVisible(true);
        en.body.setAllowGravity(false);
        en.setCollideWorldBounds(true);
        en.body.onWorldBounds = true;
      }
    }

    // enemy
    enemies = this.physics.add.group({
      defaultKey: 'enemy',
      maxSize: 30,
    });

    this.physics.add.collider(this.spikes, enemies, function(spike, enemy) {
      spikeFall.play({
        volume: soundEffectsVolume,
        loop: false
      });
      spike.destroy();
      enemy.health -= 1;
      currentScene.deathSound.play({
        volume: soundEffectsVolume,
        loop: false
      });

      if (enemy.health <= 0) {
        let part = parts.get();
        if (part) {
          part.x = enemy.x;
          part.y = enemy.y;

        }
        enemy.destroy(0);
      }
      else {
        enemy.setSize(16, 12).setOffset(0, 4);
        enemy.setTexture('enemyDamaged');
      }

    });

    this.physics.add.collider(enemies, myworldlayer);
    this.physics.add.collider(enemies, enemies);
    this.physics.add.collider(player.sprite, enemies, function(p, enemy) {
      player.damagePlayer(1);
    });

    for (let i = 0; i < 11; i++) {
      let enemySpawn = mymap.findObject("enemySpawnPoints", obj => obj.name === ("enemy" + (1 + i)));
      let en = enemies.get();
      en.x = enemySpawn.x;
      en.y = enemySpawn.y - 8;
      if (en) {
        en.health = 2;
        en.setActive(true);
        en.setVisible(true);
        en.body.setAllowGravity(true);
        en.setCollideWorldBounds(true);
        en.body.onWorldBounds = true;
      }
    }

    // collectibles
    parts = this.physics.add.group({
      defaultKey: 'part',
      maxSize: 20
    });

    this.physics.add.collider(parts, myworldlayer);
    this.physics.add.overlap(parts, player.sprite, function(p, part) {
      computerParts += 1;
      computerPartsText.setText('Parts: ' + computerParts);
      part.destroy();
      currentScene.pickUp.play({
        volume: soundEffectsVolume,
        loop: false
      });
    });

    this.physics.add.overlap(weapon1.bullets, enemies, function(bullet, enemy) {
      enemy.health -= 1;
      weapon1.shootOver(bullet);
      currentScene.deathSound.play({
        volume: soundEffectsVolume,
        loop: false
      });

      if (enemy.health <= 0) {
        let part = parts.get();
        if (part) {
          part.x = enemy.x;
          part.y = enemy.y;

        }
        enemy.destroy(0);
      }
      else {
        enemy.setSize(16, 12).setOffset(0, 4);
        enemy.setTexture('enemyDamaged');
      }
    });

    // camera   
    camera = this.cameras.main;
    camera.startFollow(player.cameraBox, false, 1, 1, 0, 0);
    this.cameras.main.setBounds(0, 0, 3856, 1184 - 2);
    this.physics.world.setBounds(0, 0, 3856, 1184 - 2);

    // creates UI
    this.createUI(); // always at the end

    // converastions

  }

  update = function() {
    enemies.children.iterate(function(en) {
      if (Phaser.Math.Distance.Between(en.x, en.y, player.sprite.x, player.sprite.y) < 200) {
        if (player.sprite.x > en.x) {
          en.flipX = true;
          en.setVelocityX(60);
        }
        else if (player.sprite.x < en.x) {
          en.flipX = false;
          en.setVelocityX(-60);
        }
      }
      else {
        en.setVelocityX(0);
      }
    });

    this.spikes.children.iterate(function(spike) {
      if (Phaser.Math.RoundTo(player.sprite.x, 0) === Phaser.Math.RoundTo(spike.x, 0) && player.sprite.y > spike.y) {
        spike.body.setAllowGravity(true);
      }
    });
    weapon1.listen();
    player.updatePlayer();
    //this.updateUI();
  }

}

let stackText;
// simple boss fight against the STACK
class fall_4 extends UIScene {
  constructor() {
    super({
      key: 'fall_4'
    });
  }

  preload = function() {
    // load UI
    this.loadUI();

    // bullet
    this.load.image('laser', 'Assets/Sprites/weapons/laser.png');
    this.load.audio('laserSound', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/Weapons/Gun/8BitRetroSFXPack1_Traditional_Weapon_Gun09.wav');
    this.load.audio('damage', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/DamageDealtTaken/8BitRetroSFXPack1_Traditional_Damage10.wav');
    this.load.audio('jump', 'Assets/Audio/8Bit Retro Game SFX Pack - 96kHz 24Bit/02Traditional/Jump/8BitRetroSFXPack1_Traditional_Jump02.wav');

    // music
    this.load.audio('battleMusic', 'Assets/Audio/music/pixel_sprinter_loop.wav');

    //characters
    this.load.image('PC_com', 'Assets/Sprites/Characters/player/pc_com.png');
    this.load.image('theStack1', 'Assets/Sprites/enemies/theStack1.png');
    this.load.image('theStack2', 'Assets/Sprites/enemies/theStack2.png');
    this.load.image('theStack3', 'Assets/Sprites/enemies/theStack3.png');
    this.load.image('theStack4', 'Assets/Sprites/enemies/theStack4.png');
    this.load.image('theStack5', 'Assets/Sprites/enemies/theStack5.png');
    // BG
    this.load.image('mirrorLake', 'Assets/Sprites/battle.png');

    // platform
    this.load.image('lakePlatform', 'Assets/Sprites/platform.png');
  }

  create = function() {

    diedSceneKey = 'fall_4';
    health = MAX_HEALTH;

    // music
    music = this.sound.add('battleMusic');
    music.play({
      volume: 0,
      loop: true
    });

    this.tweens.add({
      targets: music,
      volume: musicVolume,
      duration: 2000
    });

    // BG
    this.add.image(256, 144, 'mirrorLake').setScrollFactor(0);

    // player
    player = new Player(16, 165, 'PC_com', 'jump', 'damage');

    // player's weapon
    weapon1 = new Weapon(this.physics.add.group({
      defaultKey: 'laser',
      maxSize: 10,
    }), 1, 300, 100, 500, 150, 'laserSound');

    this.platform = this.physics.add.staticImage(512 / 2, 288 - 16, 'lakePlatform');

    this.physics.add.collider(player.sprite, this.platform);

    this.physics.add.collider(weapon1.bullets, this.platform, function(bullet, p) {
      weapon1.shootOver(p);
    });

    this.cameras.main.setBounds(0, 0, 512, 288);

    this.stack = this.physics.add.sprite(256, 144, 'theStack5').setCollideWorldBounds(true).setMaxVelocity(50);
    this.physics.add.collider(this.stack, this.platform);
    this.physics.add.collider(this.stack, player.sprite, function() {
      player.damagePlayer(1);
    });
    this.physics.add.overlap(this.stack, weapon1.bullets, function(stack, bullet) {
      weapon1.shootOver(bullet);
      if (stack.stackState === 'vulnerable') {
        stack.damageBoss();
      }
      else if ((stack.stackState === 'wander' || stack.stackState === 'followPlayer') && (player.sprite.y < stack.y - (48 - stackResize))) {
        stack.damageBoss();
      }
      else if (lastStack) {
        stack.damageBoss();
      }
    });

    this.stack.stackHealth = 100;
    this.stack.charging = false;
    this.stack.stackState = 'followPlayer';
    this.stack.damageBoss = function() {
      this.stackHealth -= 1;
      stackText.setText('STACK HEALTH: ' + this.stackHealth + '/' + 100);
      if (this.stackHealth === 80) {
        this.setTexture('theStack4').setSize(38, 128);
        stackResize = 32;
      }
      else if (this.stackHealth === 60) {
        this.setTexture('theStack3').setSize(38, 96);
        stackResize = 64;
      }
      else if (this.stackHealth === 40) {
        this.setTexture('theStack2').setSize(36, 64);
        stackResize = 48;
      }
      else if (this.stackHealth === 20) {
        this.setTexture('theStack1').setSize(32, 32);
        lastStack = true;
      }
    }
    // different states:
    // followPlayer: follows the player, can only be hurt from above
    // wander: just wanders around the stage, can only be hurt from above
    // charge: charges up an attack and rushes at the player, can not be hurt in this momment
    // vulnerable: can be hurt from any where and can't move 

    // create UI
    this.createUI(); // always at the end
    this.chargeSpeed = 0;

    stackText = this.add.text(150, 3, 'STACK HEALTH: ' + this.stack.stackHealth + '/' + 100, {
      fontSize: '24px',
      fontFamily: 'c64esque',
      color: '#FFF'
    }).setScrollFactor(0).setColor('#FF0000');
    // no conversation in this level
  }

  update = function() {
    //this.updateUI();
    weapon1.listen();
    player.updatePlayer();

    // update boss 
    if (this.stack.stackHealth <= 0) {
      // next scene
      music.stop();
      currentScene.scene.start('Cutscene6');
    }
    else {
      switch (this.stack.stackState) {
        case 'wander':
          this.stack.setTint('0xffffff');

          break;

        case 'followPlayer':
          this.stack.setTint('0xffffff');
          if (player.sprite.x > this.stack.x) {
            this.stack.flipX = true;
            this.stack.setAccelerationX(60);
          }
          else {
            this.stack.flipX = false;
            this.stack.setAccelerationX(-60);
          }

          switch (Phaser.Math.Between(1, 100)) {
            case 10: // follow player
              this.stack.stackState = 'charge';
              break;
          }
          break;

        case 'charge':
          this.stack.setTint('0xff0000');
          if (player.sprite.x > this.stack.x) {
            this.stack.flipX = true;
            this.chargeSpeed = 180;
          }
          else {
            this.chargeSpeed = -180;
            this.stack.flipX = false;
          }

          if (this.stack.charging === false) {
            this.stack.setMaxVelocity(200).setAccelerationX(0).setVelocityX(0);
            this.charge();
          }
          break;

        case 'vulnerable':
          this.stack.setTint('0xFED8B1');
          currentScene.time.delayedCall(3000, this.vOver, [], this);
          break;
      }
    }
  }

  vOver = function() {
    switch (Phaser.Math.Between(2, 2)) {
      case 1: // wander
        this.stack.stackState = 'wander';
        break;
      case 2: // follow player
        this.stack.stackState = 'followPlayer';
        break;
    }
  }

  charge() {
    this.stack.charging = true;
    currentScene.time.delayedCall(3000, this.chargeOver, [], this);
  }

  chargeOver() {
    this.stack.setVelocityX(this.chargeSpeed);
    currentScene.time.delayedCall(1500, this.attackOver, [], this);
  }

  attackOver() {
    this.stack.setVelocityX(0);
    this.stack.setMaxVelocity(80);
    this.stack.charging = false;
    this.stack.stackState = 'vulnerable';
  }

}