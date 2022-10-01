class Scene extends Phaser.Scene {

    CAMERA_VEL = 5;

    WORLD_BOUNDS = 2000;

    SCREEN_WIDTH = 1600;
    SCREEN_HEIGHT = 1000;

    constructor() {
        super();
    }

    preload() {
        this.load.image('background', '../assets/sprites/background.png');
        this.load.image('player_idle_forward', '../assets/sprites/player/player_idle_forward.png');
        this.load.image('player_idle_left', '../assets/sprites/player/player_idle_left.png');
        this.load.image('player_idle_right', '../assets/sprites/player/player_idle_right.png');
        this.load.image('player_idle_back', '../assets/sprites/player/player_idle_back.png');
        this.inputController = new InputController(this);
    }

    create() {
        console.log(this);
        this.cameras.main.setBounds(0, 0, this.WORLD_BOUNDS, this.WORLD_BOUNDS);
        let background = this.add.image(0, 0, 'background').setOrigin(0);
        this.physics.world.setBounds(0, 0, this.WORLD_BOUNDS, this.WORLD_BOUNDS);
        background.setScale(4);
        
        let spr_player = this.physics.add.sprite(500, 500, 'player_idle_forward');
        this.player = new Player(this, spr_player);

        this.cameras.main.startFollow(this.player.spr_player, true, 1, 1);
    }

    update() {
        this.checkPlayerMovement();
        this.checkPlayerRotation();
    }

    checkPlayerMovement() {
        if (this.inputController.a_pressed)
            this.player.moveLeft();

        if (this.inputController.d_pressed)
            this.player.moveRight();

        if (this.inputController.w_pressed)
            this.player.moveBack();
        
        if (this.inputController.s_pressed)
            this.player.moveForward();
    }

    checkPlayerRotation() {
        let deltaX = this.input.mousePointer.x - this.player.getX() + this.cameras.main.worldView.x;
        let deltaY = this.input.mousePointer.y - this.player.getY() + this.cameras.main.worldView.y;
        //console.log(this.cameras.main.worldView.x);
        //let local = this.player.spr_player.getLocalPoint(this.input.mousePointer.x, this.input.mousePointer.y);
        //console.log(local);
        console.log("Mouse: " + deltaX + ", " + deltaY);
        //console.log("Player: " + this.player.getX() + ", " + this.player.getY())

        //console.log(this.player.getX() - this.WORLD_BOUNDS)

        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0)
            this.player.lookLeft();
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0)
            this.player.lookRight();
        if (Math.abs(deltaX) < Math.abs(deltaY) && deltaY < 0)
            this.player.lookBack();
        if ((Math.abs(deltaX) < Math.abs(deltaY) && deltaY > 0))
            this.player.lookForward();
    }
}