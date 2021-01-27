class Load extends Phaser.Scene {
  constructor() {
    super("Load");
  }
  preload() {
    this.load.image("logo", "./assets/img/nfinity.png");
    /*
    // You can access the game's config to read the width & height
    const { width, height } = this.sys.game.config;
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(0, 0, 300, 30);

    for (var i = 0; i < 10; i++) {
      this.load.image("logo" + i, "./assets/img/nfinity.png");
    }

    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(0, 0, 300 * value, 30);
    });

    this.load.on("complete", function () {
      console.log("complete");
      progressBar.destroy();
      progressBox.destroy();
    });
    */
  }
  create() {
    // You can access the game's config to read the width & height
    const { width, height } = this.sys.game.config;
    var logo = this.add.image(width / 2, height / 2, "logo").setScale(0.5);
    setTimeout(() => {
      this.scene.start("Menu");
    }, 2000);
  }
  update() {
    //   actual game loop, like void loop()
  }
}
