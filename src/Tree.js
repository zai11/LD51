class Tree {
    constructor(context, environment, spr_tree) {
        this.context = context;
        this.environment = environment;
        this.spr_tree = spr_tree;

        spr_tree.setScale(3);
        spr_tree.depth = spr_tree.y;
    }
}