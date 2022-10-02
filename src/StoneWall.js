class StoneWall extends Wall {
    constructor(context, x, y, id) {
        let sprite = context.physics.add.sprite(x, y, 'stone_wall');
        super(context, 10, sprite, id);
    }
}