class Enemy {
    constructor(context, spr_enemy, id) {
        this.context = context;
        this.spr_enemy = spr_enemy;
        this.id = id;

        this.spr_enemy.setCollideWorldBounds(true);
        this.spr_enemy.setScale(2);
        console.log(this.context.physics);
    }

    update() {
        this.spr_enemy.depth = this.spr_enemy.y;
        this.context.physics.moveToObject(this.spr_enemy, this.context.player.spr_player, 80);
        this.checkRotation();
    }

    checkRotation() {
        let target_x = this.context.player.spr_player.x;
        let target_y = this.context.player.spr_player.y;

        let deltaX = target_x - this.spr_enemy.x;
        let deltaY = target_y - this.spr_enemy.y;

        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0)
            this.lookLeft();
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0)
            this.lookRight();
        if (Math.abs(deltaX) < Math.abs(deltaY) && deltaY < 0)
            this.lookBack();
        if ((Math.abs(deltaX) < Math.abs(deltaY) && deltaY > 0))
            this.lookForward();
    }
    
    lookForward() {
        this.spr_enemy.setTexture('enemy_forward');
    }

    lookBack() {
        this.spr_enemy.setTexture('enemy_back');
    }

    lookLeft() {
        this.spr_enemy.setTexture('enemy_left');
    }

    lookRight() {
        this.spr_enemy.setTexture('enemy_right');
    }
}