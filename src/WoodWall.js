class WoodWall extends Wall {
    constructor(context, x, y, id) {
        let sprite = context.physics.add.sprite(x, y, 'wood_wall');
        super(context, 5, sprite, id);
    }
}