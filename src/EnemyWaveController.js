class EnemyWaveController {
    constructor(context) {
        this.context = context;
        this.waves = [];
    }

    generateWave(enemyCount) {
        let wave = [];
        for (let i = 0; i < enemyCount; i++) {
            let pos = this.generateEnemyPos();
            let spr_enemy = this.context.physics.add.sprite(pos.x, pos.y, 'enemy_forward');
            let enemy = new Enemy(this.context, spr_enemy, this.waves.length, wave.length);
            wave.push(enemy);
        }
        this.waves.push(wave);
    }

    generateEnemyPos() {
        let x_tile = Math.floor(Math.random()*40) + 1;
        let x_pos = x_tile * 50 - 25;

        let y_tile = Math.floor(Math.random() * 15) + 1;
        let y_pos = y_tile * 128 - 64;

        let result = {x: x_pos, y: y_pos};

        return result;
    }

    update() {
        this.waves.forEach((wave) => {
            wave.forEach((enemy) => {
                enemy.update();
            });
        });
    }
}