var config = {
    type: Phaser.AUTO,
    width: 1067,
    height: 667,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    pixelArt: true,
    scene: [new Scene(this)]
};

var game = new Phaser.Game(config);