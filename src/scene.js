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
        this.load.image('wood_wall', '../assets/sprites/walls/wood_wall.png');
        this.load.image('stone_wall', '../assets/sprites/walls/stone_wall.png');
        this.load.image('metal_wall', '../assets/sprites/walls/metal_wall.png');
        this.load.image('wood_wall_error', '../assets/sprites/walls/wood_wall_error.png');
        this.load.image('stone_wall_error', '../assets/sprites/walls/stone_wall_error.png');
        this.load.image('metal_wall_error', '../assets/sprites/walls/metal_wall_error.png');
    }

    create() {
        this.timer = 10;
        this.lives = 5;
        this.selected = InventoryBar.SELECTED_GUN;
        this.ui = new UI(this);
        this.inputController = new InputController(this);
        this.enemyWaveController = new EnemyWaveController(this);

        this.enemyWaveController.generateWave(5);
        this.enemyWaveController.generateWave(3);
        this.environment = new Environment(this);

        let spr_player = this.physics.add.sprite(500, 500, 'player_idle_forward');
        this.player = new Player(this, spr_player);
        this.player.inventory = this.ui.ui_objects['inventoryBar'];
        this.player.inventory.wood_count = 50;

        this.cameras.main.setBounds(0, 0, this.WORLD_BOUNDS, this.WORLD_BOUNDS);
        let background = this.add.image(0, 0, 'background').setOrigin(0);
        this.physics.world.setBounds(0, 0, this.WORLD_BOUNDS, this.WORLD_BOUNDS);
        background.setScale(4);
        
        this.cameras.main.startFollow(this.player.spr_player, true, 1, 1);

        this.bullets = [];
        this.walls = [];
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
        this.checkWallPlacement();
        this.player.update();
        this.enemyWaveController.update();
        this.environment.update();
        this.bullets.forEach((bullet) => {
            bullet.update();
        });
        this.walls.forEach((wall) => {
            wall.update();
        });
    }

    checkPlayerMovement() {
        if (!this.player.can_use_action)
            return;


        if (this.inputController.pressed_a || this.inputController.pressed_d) {
            if (this.inputController.pressed_a)
                this.player.moveLeft();

            if (this.inputController.pressed_d)
                this.player.moveRight();
        }
        else {
            this.player.stopHorizontalMovement();
        }

        if (this.inputController.pressed_w || this.inputController.pressed_s) {
            if (this.inputController.pressed_w)
                this.player.moveBack();
    
            if (this.inputController.pressed_s)
                this.player.moveForward();
        }
        else {
            this.player.stopVerticalMovement();
        }
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

    checkWallPlacement() {
        if (this.justPlaced)
            return;
        this.checkWoodWallPlacement();
        this.checkStoneWallPlacement();
        this.checkMetalWallPlacement();
    }

    checkWoodWallPlacement() {
        if (this.inputController.clicked && this.player.inventory.selected === this.player.inventory.SELECTED_WOOD && !this.ui.build_cursor.overlap) {
            this.placeWoodWall(this.input.mousePointer.x + this.cameras.main.worldView.x, this.input.mousePointer.y + this.cameras.main.worldView.y);
            this.justPlaced = true;
            this.resetJustPlaced();
        }
    }

    placeWoodWall(x, y) {
        if (this.player.inventory.wood_count <= 0)
            return;
        let wall = new WoodWall(this, x, y, this.walls.length);
        this.walls.push(wall);
        this.player.inventory.wood_count--;
    }

    checkStoneWallPlacement() {
        if (this.inputController.clicked && this.player.inventory.selected === this.player.inventory.SELECTED_STONE && !this.ui.build_cursor.overlap) {
            this.placeStoneWall(this.input.mousePointer.x + this.cameras.main.worldView.x, this.input.mousePointer.y + this.cameras.main.worldView.y);
            this.justPlaced = true;
            this.resetJustPlaced();
        }
    }

    placeStoneWall(x, y) {
        if (this.player.inventory.stone_count <= 0)
            return;
        let wall = new StoneWall(this, x, y);
        this.walls.push(wall);
        this.player.inventory.stone_count--;
    }

    checkMetalWallPlacement() {
        if (this.inputController.clicked && this.player.inventory.selected === this.player.inventory.SELECTED_IRON && !this.ui.build_cursor.overlap) {
            this.placeMetalWall(this.input.mousePointer.x + this.cameras.main.worldView.x, this.input.mousePointer.y + this.cameras.main.worldView.y);
            this.justPlaced = true;
            this.resetJustPlaced();
        }
    }

    placeMetalWall(x, y) {
        if (this.player.inventory.iron_count <= 0)
            return;
        let wall = new MetalWall(this, x, y);
        this.walls.push(wall);
        this.player.inventory.iron_count--;
    }

    resetJustPlaced() {
        setTimeout(() => {
            this.justPlaced = false;
        }, 300);
    }
}