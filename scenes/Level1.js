class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }
  preload() {
    this.currentLevel = 1;
    let currentLevel = this.currentLevel;
    // Virtual Joystick
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "./assets/plugins/rexjoystickplugin.min.js",
      true
    );

    this.load.image("bot", "../assets/sprite/vacuumbot.png");
    this.load.image("tiles", "../assets/tilesets/tilemap.png");
    this.load.tilemapTiledJSON(
      "map",
      `../assets/tilemap/Level${currentLevel}.json`
    );
    this.load.image("fire-particle", "../assets/img/particle_fire.png");
  }
  create() {
    let currentLevel = this.currentLevel;

    // You can access the game's config to read the width & height
    const { width, height } = this.sys.game.config;
    console.log("L1");

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tilemap", "tiles");

    this.world = map.createLayer("colliders", tileset, 0, 0);
    this.bombs = map.createLayer("bombs", tileset, 0, 0);
    this.chips = map.createLayer("chips", tileset, 0, 0);

    this.world.setCollisionByExclusion(-1, true);
    this.bombs.setCollisionByExclusion(-1, true);
    this.chips.setCollisionByExclusion(-1, true);

    this.bot = this.physics.add.sprite(100, 500, "bot").setScale(0.1);
    this.bot.setBounce(0.002);
    // this.bot.setCollideWorldBounds(true);

    this.physics.add.collider(this.bot, this.world);

    this.physics.add.collider(this.bot, this.bombs, () => {
      let particles = this.add.particles("fire-particle");

      let emitter = particles.createEmitter({
        speed: 1000,
        // scale: { start: 1, end: 0 },
        alpha: 0.2,
        blendMode: "ADD",
        x: this.bot.x,
        y: this.bot.y,
        gravityY: 3000,
      });
      // emitter.startFollow(this.bot);
      setTimeout(() => {
        this.scene.start("GameOver");
      }, 250);
    });

    this.physics.add.collider(this.bot, this.chips, () => {
      this.scene.start(`Level${currentLevel + 1}`);
    });

    const camera = this.cameras.main;
    camera.startFollow(this.bot);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();

    if (IS_TOUCH === true) {
      // Create joystick instace
      var joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
        x: width - 150,
        y: height - 120,
        radius: 100,
        base: this.add.circle(0, 0, 100, 0xffffff).setDepth(11).setAlpha(0.5),
        thumb: this.add.circle(0, 0, 50, 0xffffff).setDepth(12).setAlpha(0.8),
        dir: "8dir",
        // forceMin: 16,
        // fixed: true,
        // enable: true
      });

      //   create joystick cyrsors
      this.joystickKeys = joystick.createCursorKeys();
    } else {
      this.joystickKeys = this.input.keyboard.createCursorKeys();
    }

    this.add
      .text(16, 16, `Level${currentLevel}`, {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000",
      })
      .setScrollFactor(0);
  }
  update() {
    let player = this.bot;
    let cursors = this.cursors;
    let joystickKeys = this.joystickKeys;
    const speed = 300;
    if (cursors.left.isDown || joystickKeys.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown || joystickKeys.right.isDown) {
      player.setVelocityX(160);
    } else {
      player.setVelocityX(0);
    }

    if (
      (cursors.up.isDown || joystickKeys.up.isDown) &&
      player.body.blocked.down
    ) {
      player.setVelocityY(-600);
    }

    // // Normalize and scale the velocity so that this.bot can't move faster along a diagonal
    // this.bot.body.velocity.normalize().scale(speed);
  }
}
