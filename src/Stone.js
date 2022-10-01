class Stone {
    constructor(context, environment, spr_stone) {
        this.context = context;
        this.environment = environment;
        this.spr_stone = spr_stone;

        spr_stone.setScale(3);
        spr_stone.depth = spr_stone.y - 40;
    }
}