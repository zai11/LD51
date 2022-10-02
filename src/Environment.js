class Environment {
    
    TREE_COUNT = 15;
    STONE_COUNT = 10;
    IRON_COUNT = 5;

    constructor(context) {

        this.context = context;

        this.trees = [];
        this.stones = [];
        this.irons = [];

        for (let i = 0; i < this.TREE_COUNT; i++) {
            
            let pos = this.generateTreePos();

            let spr_tree = context.physics.add.sprite(pos.x, pos.y, 'tree');
            let tree = new Tree(this.context, this, spr_tree);
            this.trees.push(tree);
        }


        for (let i = 0; i < this.STONE_COUNT; i++) {
            let pos = this.generateStonePos();

            let spr_stone = context.physics.add.sprite(pos.x, pos.y, 'stone');
            let stone = new Stone(this.context, this, spr_stone);
            this.stones.push(stone);
        }

        for (let i = 0; i < this.IRON_COUNT; i++) {
            let pos = this.generateIronPos();
            
            let spr_iron = context.physics.add.sprite(pos.x, pos.y, 'iron');
            let iron = new Iron(this.context, this, spr_iron);
            this.irons.push(iron);
        }

        this.trees.forEach((tree) => {
            tree.sprite.depth = tree.sprite.y;
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

    update() {
        this.checkGatherWood();
        this.checkGatherRock();
    }

    checkGatherWood() {
        let inventory = this.context.player.inventory;
        if (inventory.selected == inventory.SELECTED_AXE) {
            this.stones.forEach(stone => stone.setSelected(false));
            this.irons.forEach(iron => iron.setSelected(false));
            let nearest_tree = null;
            let distance = Infinity;
            this.trees.forEach((tree) => {
                if (tree.chopped)
                    return;
                this.context.ui.clearPointer();
                tree.setSelected(false);
                let curr_dist = Phaser.Math.Distance.Between(this.context.player.getX(), this.context.player.getY(), tree.sprite.x, tree.sprite.y);
                if (curr_dist < distance) {
                    nearest_tree = tree;
                    distance = curr_dist;
                }
            });


            if (distance <= 36*3 && this.context.player.can_use_action) {
                this.context.ui.createAxePointer(nearest_tree.sprite.x, nearest_tree.sprite.y);
                nearest_tree.setSelected();
                if (this.context.inputController.pressed_space) {
                    this.context.ui.clearPointer();
                    this.context.ui.createProgressBar(nearest_tree.sprite.x, nearest_tree.sprite.y - 106, 1000);
                    this.context.player.chopTree(nearest_tree);
                }
            }
        }
    }

    checkGatherRock() {
        let inventory = this.context.player.inventory;
        if (inventory.selected == inventory.SELECTED_PICK) {
            this.trees.forEach(tree => tree.setSelected(false));
            let nearest_rock = null;
            let distance = Infinity;
            this.stones.forEach((stone) => {
                if (stone.chopped)
                    return;
                this.context.ui.clearPointer();
                stone.setSelected(false);
                let curr_dist = Phaser.Math.Distance.Between(this.context.player.getX(), this.context.player.getY(), stone.sprite.x, stone.sprite.y);
                if (curr_dist < distance) {
                    nearest_rock = stone;
                    distance = curr_dist;
                }
            });

            this.irons.forEach((iron) => {
                if (iron.chopped)
                    return;
                this.context.ui.clearPointer();
                iron.setSelected(false);
                let curr_dist = Phaser.Math.Distance.Between(this.context.player.getX(), this.context.player.getY(), iron.sprite.x, iron.sprite.y);
                if (curr_dist < distance) {
                    nearest_rock = iron;
                    distance = curr_dist;
                }
            });

            if (distance <= 36*3 && this.context.player.can_use_action) {
                this.context.ui.createPickPointer(nearest_rock.sprite.x, nearest_rock.sprite.y);
                nearest_rock.setSelected();
                if (this.context.inputController.pressed_space) {
                    if (nearest_rock.isStone) {
                        this.context.ui.createProgressBar(nearest_rock.sprite.x, nearest_rock.sprite.y - 60, 1500);
                        this.context.player.chopStone(nearest_rock);
                    }
                    else {
                        this.context.ui.createProgressBar(nearest_rock.sprite.x, nearest_rock.sprite.y - 60, 2500);
                        this.context.player.chopIron(nearest_rock);
                    }
                }
            }
        }
    }
}