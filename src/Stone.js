class Stone {
    constructor(context, environment, sprite) {
        this.context = context;
        this.environment = environment;
        this.sprite = sprite;

        sprite.setScale(3);
        sprite.depth = sprite.y - 40;
        this.selected = false;
        this.isStone = true;
    }

    setSelected(selected = true) {
        if (this.chopped)
            return;
        this.selected = selected;
        if (this.selected)
            this.sprite.setTexture('stone_selected');
        else
            this.sprite.setTexture('stone');
    }

    chop(chopped = true) {
        this.chopped = chopped;
        if (this.chopped) {
            this.sprite.setTexture('stone_chopped');
            this.startRegrowth();
        }
        else 
            this.setSelected(this.selected);
    }

    startRegrowth() {
        setTimeout(() => {
            this.chop(false);
        }, 20000);
    }
}