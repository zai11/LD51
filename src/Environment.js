class Environment {
    
    TREE_COUNT = 15;
    STONE_COUNT = 10;
    IRON_COUNT = 5;

    constructor(context) {

        this.trees = [];
        this.stones = [];
        this.irons = [];

        for (let i = 0; i < this.TREE_COUNT; i++) {
            
            let pos = this.generateTreePos();

            let spr_tree = context.physics.add.sprite(pos.x, pos.y, 'tree');
            let tree = new Tree(context, this, spr_tree);
            this.trees.push(tree);
        }


        for (let i = 0; i < this.STONE_COUNT; i++) {
            let pos = this.generateStonePos();

            let spr_stone = context.physics.add.sprite(pos.x, pos.y, 'stone');
            let stone = new Stone(context, this, spr_stone);
            this.stones.push(stone);
        }

        for (let i = 0; i < this.IRON_COUNT; i++) {
            let pos = this.generateIronPos();
            
            let spr_iron = context.physics.add.sprite(pos.x, pos.y, 'iron');
            let iron = new Iron(context, this, spr_iron);
            this.irons.push(iron);
        }

        this.trees.forEach((tree) => {
            tree.spr_tree.depth = tree.spr_tree.y;
        });
    }

    generateTreePos() {
        let x_tile = Math.floor(Math.random()*20) + 1;
        let x_pos = x_tile * 100 - 50;

        let y_tile = Math.floor(Math.random() * 12) + 1;
        let y_pos = y_tile * 150 - 75;

        let result = {x: x_pos, y: y_pos};

        return result;
    }

    generateStonePos() {
        let x_tile = Math.floor(Math.random()*20) + 1;
        let x_pos = x_tile * 100 - 50;

        let y_tile = Math.floor(Math.random() * 12) + 1;
        let y_pos = y_tile * 150 - 75;

        let result = {x: x_pos, y: y_pos};

        return result;
    }

    generateIronPos() {
        return this.generateStonePos();
    }
}