class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }
  preload() {
    //   load images,
  }
  create() {
    // You can access the game's config to read the width & height
    const { width, height } = this.sys.game.config;
    console.log("Ready!");
    let header = this.add
      .text(width / 2, height / 2, "Mess is Lore", {
        font: `${width / 10}px sans-serif`,
      })
      .setOrigin(0.5);
    let fadeText = this.add
      .text(width / 2, height / 2 + height / 5, "Tap to continue", {
        font: "10px sans-serif",
      })
      .setOrigin(0.5)
      .setAlpha(0);
    this.input.on("pointerdown", () => {
      this.scene.start("Level1");
    });

    this.tweens.add(
      {
        targets: [fadeText, header],
        alpha: 1,
        duration: 800,
        ease: "Power2",
      },
      this
    );
  }
  update() {
    // Check touch input
    window.addEventListener("touchstart", function () {
      IS_TOUCH = true;
    });
  }
}
