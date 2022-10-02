class Tree {
    constructor(context, environment, sprite) {
        this.context = context;
        this.environment = environment;
        this.sprite = sprite;

        sprite.setScale(3);
        sprite.depth = sprite.y;
        this.selected = false;
    }

    setSelected(selected = true) {
        if (this.chopped)
            return;
        this.selected = selected;
        if (this.selected)
            this.sprite.setTexture('tree_selected');
        else
            this.sprite.setTexture('tree');
    }

    chop(chopped = true) {
        this.chopped = chopped;
        if (this.chopped) {
            this.sprite.setTexture('tree_chopped');
            this.startRegrowth();
        }
        else 
            this.setSelected(this.selected);
    }

    startRegrowth() {
        setTimeout(() => {
            this.chop(false);
        }, 10000)
    }
}