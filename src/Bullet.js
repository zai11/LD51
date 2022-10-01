class Bullet {

    VELOCITY = 400;

    DIRECTION_FORWARD = 0;
    DIRECTION_LEFT = 1;
    DIRECTION_BACK = 2;
    DIRECTION_RIGHT = 3;

    constructor(context, spr_bullet, target, id) {
        this.context = context;
        this.spr_bullet = spr_bullet;
        this.target = target;
        this.id = id;

        this.context.physics.moveTo(this.spr_bullet, this.target.x, this.target.y, this.VELOCITY);
    }

    update() {
        this.context.enemyWaveController.waves.forEach((wave) => {
            wave.forEach((enemy) => {
                this.context.physics.overlap(enemy.spr_enemy, this.spr_bullet, () => {
                    this.destroy();
                    enemy.destroy();
                })
            });
        });
    }

    destroy() {
        this.context.bullets.splice(this.id, 1);
        this.spr_bullet.destroy();
    }
}