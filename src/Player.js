class Player {

    VELOCITY = 5;

    DIRECTION_FORWARD = 0;
    DIRECTION_LEFT = 1;
    DIRECTION_BACK = 2;
    DIRECTION_RIGHT = 3;
    
    constructor(context, spr_player) {
        this.context = context;
        this.spr_player = spr_player;
        this.spr_player.setCollideWorldBounds(true);
        this.spr_player.setScale(2);
        this.lookForward();
        this.reloading = false;
        this.invincible = false;
        this.can_use_action = true;
    }

    update() {
        this.spr_player.depth = this.spr_player.y;
        this.checkDamage();

        this.checkDeath();
    }

    checkDamage() {
        if (this.invincible)
            return;
        this.context.enemyWaveController.waves.forEach((wave) => {
            if (this.invincible)
                return;
            wave.forEach((enemy) => {
                if (this.invincible)
                    return;
                this.context.physics.overlap(enemy.spr_enemy, this.spr_player, () => {
                    this.invincible = true;
                    this.toggleInvincible();
                    this.context.lives--;
                    return;
                })
            });
        });
    }

    checkDeath() {
        if (this.context.lives <= 0) {
            this.context.lives = 0;
            this.context.game_over = true;
            this.spr_player.destroy();
        }
    }

    toggleInvincible() {
        setTimeout(() => {
            this.invincible = false;
        }, 1000);
    }

    reload() {
        setTimeout(() => {
            this.reloading = false;
        }, 700);
    }

    shoot() {
        if (this.reloading)
            return;

        let x = 0;
        let y = 0;

        switch(this.facing) {
            case this.DIRECTION_FORWARD:
                x = this.spr_player.x;
                y = this.spr_player.getBottomCenter().y + 10;
                break;
            case this.DIRECTION_LEFT:
                x = this.spr_player.getLeftCenter().x + 2;
                y = this.spr_player.y;
                break;
            case this.DIRECTION_BACK:
                x = this.spr_player.x;
                y = this.spr_player.getTopCenter().y - 10;
                break;
            case this.DIRECTION_RIGHT:
                x = this.spr_player.getRightCenter().x - 2;
                y = this.spr_player.y;
                break;
        }

        let spr_bullet = this.context.physics.add.sprite(x, y, 'bullet');
        let target = {
            x: this.context.input.mousePointer.x + this.context.cameras.main.worldView.x,
            y: this.context.input.mousePointer.y + this.context.cameras.main.worldView.y
        };
        let bullet = new Bullet(this.context, spr_bullet, target, this.context.bullets.length);
        this.context.bullets.push(bullet);
        this.reloading = true;
        this.reload();
    }

    chopTree(tree) {
        if (this.can_use_action) {
            this.can_use_action = false;
            setTimeout(() => {
                this.can_use_action = true;
                this.inventory.wood_count += 5;
                tree.chop();
            }, 1000);
        }
    }

    chopStone(stone) {
        if (this.can_use_action) {
            this.can_use_action = false;
            setTimeout(() => {
                this.can_use_action = true;
                this.inventory.stone_count += 2;
                stone.chop();
            }, 1500);
        }
    }

    chopIron(iron) {
        if (this.can_use_action) {
            this.can_use_action = false;
            setTimeout(() => {
                this.can_use_action = true;
                this.inventory.iron_count += 1;
                iron.chop();
            }, 2500);
        }
    }

    lookForward() {
        this.spr_player.setTexture('player_idle_forward');
        this.facing = this.DIRECTION_FORWARD;
    }

    lookBack() {
        this.spr_player.setTexture('player_idle_back');
        this.facing = this.DIRECTION_BACK;
    }

    lookLeft() {
        this.spr_player.setTexture('player_idle_left');
        this.facing = this.DIRECTION_LEFT;
    }

    lookRight() {
        this.spr_player.setTexture('player_idle_right');
        this.facing = this.DIRECTION_RIGHT;
    }

    moveForward() {
        this.spr_player.y += 5;
    }

    moveBack() {
        this.spr_player.y -= 5;
    }

    moveLeft() {
        this.spr_player.x -= 5;
    }

    moveRight() {
        this.spr_player.x += 5;
    }

    getX() {
        return this.spr_player.x;
    }

    getY() {
        return this.spr_player.y;
    }
}