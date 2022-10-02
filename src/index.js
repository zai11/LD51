var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
            debugShowBody: true,
            debugShowStaticBody: true,
        }
    },
    pixelArt: true,
    scene: [new Scene(this)]
};

var game = new Phaser.Game(config);