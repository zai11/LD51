class MetalWall extends Wall {
    constructor(context, x, y, id) {
        let sprite = context.physics.add.sprite(x, y, 'metal_wall');
        super(context, 15, sprite, id);
    }
}