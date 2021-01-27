let scenes = [];

let fWidth = window.innerWidth;
let fHeight = window.innerHeight;

const config = {
  type: Phaser.CANVAS,
  parent: "game",
  width: fWidth,
  height: fHeight,
  scene: scenes,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      debug: false,
    },
  },
  parent: "game",
};

scenes.push(Load);
scenes.push(Menu);
scenes.push(GameOver);
scenes.push(Level1);
scenes.push(Level2);
scenes.push(Level3);
scenes.push(Level4);
scenes.push(Level5);

const game = new Phaser.Game(config);
