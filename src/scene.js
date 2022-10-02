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
        this.load.image('tree', '../assets/sprites/environment/tree.png');
        this.load.image('tree_selected', '../assets/sprites/environment/tree_selected.png');
        this.load.image('tree_chopped', '../assets/sprites/environment/tree_chopped.png');
        this.load.image('stone', '../assets/sprites/environment/rock_stone.png');
        this.load.image('stone_selected', '../assets/sprites/environment/rock_stone_selected.png');
        this.load.image('stone_chopped', '../assets/sprites/environment/rock_stone_chopped.png');
        this.load.image('iron', '../assets/sprites/environment/rock_iron.png');
        this.load.image('iron_selected', '../assets/sprites/environment/rock_iron_selected.png');
        this.load.image('iron_chopped', '../assets/sprites/environment/rock_iron_chopped.png');
        this.load.image('enemy_forward', '../assets/sprites/enemy/enemy_forward.png');
        this.load.image('enemy_left', '../assets/sprites/enemy/enemy_left.png');
        this.load.image('enemy_right', '../assets/sprites/enemy/enemy_right.png');
        this.load.image('enemy_back', '../assets/sprites/enemy/enemy_back.png');
        this.load.image('bullet', '../assets/sprites/bullet.png');
        this.load.image('ui_heart', '../assets/sprites/ui/heart.png');
        this.load.image('inventory_gun', '../assets/sprites/ui/inventory/gun_selected.png');
        this.load.image('inventory_axe', '../assets/sprites/ui/inventory/axe_selected.png');
        this.load.image('inventory_pick', '../assets/sprites/ui/inventory/pickaxe_selected.png');
        this.load.image('inventory_wood', '../assets/sprites/ui/inventory/wood_selected.png');
        this.load.image('inventory_stone', '../assets/sprites/ui/inventory/stone_selected.png');
        this.load.image('inventory_iron', '../assets/sprites/ui/inventory/iron_selected.png');
        this.load.image('axe_pointer', '../assets/sprites/ui/axe_pointer.png');
        this.load.image('pick_pointer', '../assets/sprites/ui/pickaxe_pointer.png')
        this.load.image('progress_bar_border', '../assets/sprites/ui/progress_bar_border.png');
        this.load.image('progress_bar_bg', '../assets/sprites/ui/progress_bar_bg.png');
    }

    create() {
        this.timer = 10;
        this.lives = 5;
        this.selected = InventoryBar.SELECTED_GUN;
        this.ui = new UI(this);
        this.inputController = new InputController(this);
        this.enemyWaveController = new EnemyWaveController(this);
        //this.enemyWaveController.generateWave(5);
        //this.enemyWaveController.generateWave(3);
        this.environment = new Environment(this);

        let spr_player = this.physics.add.sprite(500, 500, 'player_idle_forward');
        this.player = new Player(this, spr_player);
        this.player.inventory = this.ui.ui_objects['inventoryBar'];

        this.cameras.main.setBounds(0, 0, this.WORLD_BOUNDS, this.WORLD_BOUNDS);
        let background = this.add.image(0, 0, 'background').setOrigin(0);
        this.physics.world.setBounds(0, 0, this.WORLD_BOUNDS, this.WORLD_BOUNDS);
        background.setScale(4);
        
        this.cameras.main.startFollow(this.player.spr_player, true, 1, 1);

        this.bullets = [];
        this.timerTick();
    }

    update() {
        this.ui.update();

        if (this.game_over)
            return;

        this.checkPlayerMovement();
        this.checkPlayerRotation();
        this.checkPlayerShoot();
        this.checkInventorySelectionChange();
        this.player.update();
        this.enemyWaveController.update();
        this.environment.update();
        this.bullets.forEach((bullet) => {
            bullet.update();
        });
    }

    checkPlayerMovement() {
        if (!this.player.can_use_action)
            return;

        if (this.inputController.pressed_a)
            this.player.moveLeft();

        if (this.inputController.pressed_d)
            this.player.moveRight();

        if (this.inputController.pressed_w)
            this.player.moveBack();
        
        if (this.inputController.pressed_s)
            this.player.moveForward();
    }

    checkPlayerRotation() {
        let deltaX = this.input.mousePointer.x - this.player.getX() + this.cameras.main.worldView.x;
        let deltaY = this.input.mousePointer.y - this.player.getY() + this.cameras.main.worldView.y;

        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0)
            this.player.lookLeft();
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0)
            this.player.lookRight();
        if (Math.abs(deltaX) < Math.abs(deltaY) && deltaY < 0)
            this.player.lookBack();
        if ((Math.abs(deltaX) < Math.abs(deltaY) && deltaY > 0))
            this.player.lookForward();
    }

    checkPlayerShoot() {
        if (this.inputController.pressed_space && this.player.inventory.selected === this.player.inventory.SELECTED_GUN)
            this.player.shoot();
    }

    timerTick() {
        setTimeout(() => {
            this.timer--;
            if (this.timer <= 0)
                this.timer = 10;
            if (!this.game_over)
                this.timerTick();
        }, 1000);
    }

    checkInventorySelectionChange() {
        if (this.inputController.pressed_1)
            this.ui.ui_objects['inventoryBar'].selectGun();
        else if (this.inputController.pressed_2)
            this.ui.ui_objects['inventoryBar'].selectAxe();
        else if (this.inputController.pressed_3)
            this.ui.ui_objects['inventoryBar'].selectPick();
        else if (this.inputController.pressed_4)
            this.ui.ui_objects['inventoryBar'].selectWood();
        else if (this.inputController.pressed_5)
            this.ui.ui_objects['inventoryBar'].selectStone();
        else if (this.inputController.pressed_6)
            this.ui.ui_objects['inventoryBar'].selectIron();
    }
}