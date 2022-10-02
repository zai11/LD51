class Wall {
    constructor(context, health, sprite, id) {
        this.context = context;
        this.health = health;
        this.sprite = sprite;
        this.id = id;
        this.hit = false;
        this.context.physics.add.collider(this.context.player.spr_player, this.sprite);
        this.context.enemyWaveController.waves.forEach((wave) => {
            wave.forEach((enemy) => {
                this.context.physics.add.collider(enemy.spr_enemy, this.sprite, (enemy, wall) => {
                    if (!this.hit) {
                        this.hit = true;
                        this.health--;
                        this.resetHit();
                    }
                });
            });
        });
        this.sprite.depth = this.sprite.y;
        this.sprite.setImmovable(true);
    }

    update() {
        if (this.health <= 0)
            this.destroy();
    }

    resetHit() {
        setTimeout(() => {
            this.hit = false;
        }, 2000);
    }

    destroy() {
        let index = this.context.walls.findIndex((wall) => wall.id == this.id);
        this.context.walls.splice(index, 1);
        this.sprite.destroy();
    }
}