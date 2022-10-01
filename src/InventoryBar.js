class InventoryBar {

    SELECTED_NOTHING = 0;
    SELECTED_GUN = 1;
    SELECTED_AXE = 2;
    SELECTED_PICK = 3;
    SELECTED_WOOD = 4;
    SELECTED_STONE = 5;
    SELECTED_IRON = 6;

    constructor(context) {
        this.context = context;
        
        this.spr_bar = this.context.add.sprite(800, 900).setOrigin(0.5);
        this.spr_bar.setScrollFactor(0);
        this.spr_bar.depth = Infinity;
        this.spr_bar.setScale(2);

        this.wood_count = 0;
        this.stone_count = 0;
        this.iron_count = 0;

        this.wood_count_text = this.context.add.text(832, 955, this.wood_count, {fontSize: '32px', fill: '#000'}).setOrigin(0.5);
        this.wood_count_text.setScrollFactor(0);
        this.wood_count_text.depth = Infinity;

        this.stone_count_text = this.context.add.text(902, 955, this.stone_count, {fontSize: '32px', fill: '#000'}).setOrigin(0.5);
        this.stone_count_text.setScrollFactor(0);
        this.stone_count_text.depth = Infinity;

        this.iron_count_text = this.context.add.text(972, 955, this.iron_count, {fontSize: '32px', fill: '#000'}).setOrigin(0.5);
        this.iron_count_text.setScrollFactor(0);
        this.iron_count_text.depth = Infinity;

        this.selectGun();
    }

    selectGun() {
        this.spr_bar.setTexture('inventory_gun');
    }

    selectAxe() {
        this.spr_bar.setTexture('inventory_axe');
    }

    selectPick() {
        this.spr_bar.setTexture('inventory_pick');
    }

    selectWood() {
        this.spr_bar.setTexture('inventory_wood');
    }

    selectStone() {
        this.spr_bar.setTexture('inventory_stone');
    }

    selectIron() {
        this.spr_bar.setTexture('inventory_iron');
    }

    update() {
        this.checkSelection();
        this.updateItemCounts();
    }

    checkSelection() {
        switch(this.selected) {
            case this.SELECTED_GUN:
                selectGun();
                break;
            case this.SELECTED_AXE:
                this.selectAxe();
                break;
            case this.SELECTED_PICK:
                this.selectPick();
                break;
            case this.SELECTED_WOOD:
                this.selectWood();
                break;
            case this.SELECTED_STONE:
                this.selectStone();
                break;
            case this.SELECTED_IRON:
                this.selectIron();
                break;
        }
    }

    updateItemCounts() {
        this.wood_count_text.setText(this.wood_count);
        this.stone_count_text.setText(this.stone_count);
        this.iron_count_text.setText(this.iron_count);
    }
}