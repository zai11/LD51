class BuildCursor {
    constructor(context) {
        this.context = context;
        this.sprite = this.context.add.sprite(50, 50, 'wood_wall');
        this.sprite.setAlpha(0.8);
        this.sprite.depth = Infinity;
        this.texture_string = 'wood_wall';
        this.overlap = false;
    }

    setWood(error = false) {
        if (error)
            this.texture_string = 'wood_wall_error';
        else {
            this.texture_string = 'wood_wall';
        }
    }

    setStone(error = false) {
        if (error)
            this.texture_string = 'stone_wall_error';
        else {
            this.texture_string = 'stone_wall';
        }
    }

    setMetal(error = false) {
        if (error)
            this.texture_string = 'metal_wall_error';
        else {
            this.texture_string = 'metal_wall';
        }
    }

    update() {
        this.moveToMouse();
        this.sprite.setTexture(this.texture_string);
        this.checkOverlap();
    }

    moveToMouse() {
        let x = this.context.input.mousePointer.x + this.context.cameras.main.worldView.x;
        let y = this.context.input.mousePointer.y + this.context.cameras.main.worldView.y;

        this.sprite.setPosition(x, y);
    }

    destroy() {
        this.sprite.destroy();
    }

    checkOverlap() {
        let cursor_bounds = this.sprite.getBounds();
        this.overlap = false;
        this.context.environment.trees.forEach((tree) => {
            let tree_bounds = tree.sprite.getBounds();
            if (Phaser.Geom.Intersects.RectangleToRectangle(cursor_bounds, tree_bounds))
                this.overlap = true;
        });

        switch (this.texture_string) {
            case 'wood_wall':
            case 'wood_wall_error':
                this.setWood(this.overlap);
                break;
            case 'stone_wall':
            case 'stone_wall_error':
                this.setStone(this.overlap);
                break;
            case 'metal_wall':
            case 'metal_wall_error':
                this.setMetal(this.overlap);
                break;
        }
    }
}