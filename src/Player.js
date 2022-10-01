class Player {

    VELOCITY = 5;
    
    constructor(context, spr_player) {
        this.context = context;
        this.spr_player = spr_player;
        this.spr_player.setCollideWorldBounds(true);
        this.spr_player.setScale(2);
    }

    update() {
        this.spr_player.depth = this.spr_player.y;
    }

    lookForward() {
        this.spr_player.setTexture('player_idle_forward');
    }

    lookBack() {
        this.spr_player.setTexture('player_idle_back');
    }

    lookLeft() {
        this.spr_player.setTexture('player_idle_left');
    }

    lookRight() {
        this.spr_player.setTexture('player_idle_right');
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