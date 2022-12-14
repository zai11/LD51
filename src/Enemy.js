class Enemy {
    constructor(context, spr_enemy, waveId, id) {
        this.context = context;
        this.spr_enemy = spr_enemy;
        this.waveId = waveId;
        this.id = id;

        this.spr_enemy.setCollideWorldBounds(true);
        this.spr_enemy.setScale(2);

        this.context.walls.forEach((wall) => {
            this.context.physics.add.collider(wall.sprite, this.spr_enemy, (wall) => {
                if (!wall.parent_object.hit) {
                    wall.parent_object.hit = true;
                    wall.parent_object.health--;
                    wall.parent_object.resetHit();
                }
            });
        });
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

    destroy() {
        this.context.sound.play('death_sound');
        let wave = this.context.enemyWaveController.waves[this.waveId]
        let index = wave.findIndex((enemy) => enemy.id == this.id && enemy.waveId == this.waveId );
        wave.splice(index, 1);
        this.spr_enemy.destroy();
    }
}