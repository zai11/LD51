var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1000,
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

function preload ()
{
    this.load.image('background', './assets/sprites/background.png');
    this.load.image('player_idle_back', './assets/sprites/player/player_idle_back.png');
    this.load.image('player_idle_forward', './assets/sprites/player/player_idle_forward.png');
    this.load.image('player_idle_left', './assets/sprites/player/player_idle_left.png');
    this.load.image('player_idle_right', './assets/sprites/player/player_idle_right.png');
    this.load.image('tree', './assets/sprites/environment/tree.png');
    this.load.image('rock_stone', 'assets/sprites/environment/rock_stone.png');
    this.load.image('rock_iron', 'assets/sprites/environment/rock_iron.png');
}

function create ()
{
    let background = this.add.image(400, 300, 'background');
    background.setScale(2);
}

function update ()
{
}