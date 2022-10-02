class InventoryBar {

    SELECTED_NOTHING = 0;
    SELECTED_GUN = 1;
    SELECTED_AXE = 2;
    SELECTED_PICK = 3;
    SELECTED_WOOD = 4;
    SELECTED_STONE = 5;
    SELECTED_IRON = 6;

    constructor(context, parent_ui) {
        this.context = context;
        this.parent_ui = parent_ui;
        
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

        this.selected = this.SELECTED_GUN;
        this.selectGun();
    }

    selectGun() {
        this.selected = this.SELECTED_GUN;
        this.spr_bar.setTexture('inventory_gun');
        this.parent_ui.clearBuildCursor();
    }

    selectAxe() {
        this.selected = this.SELECTED_AXE;
        this.spr_bar.setTexture('inventory_axe');
        this.parent_ui.clearBuildCursor();
    }

    selectPick() {
        this.selected = this.SELECTED_PICK;
        this.spr_bar.setTexture('inventory_pick');
        this.parent_ui.clearBuildCursor();
    }

    selectWood() {
        this.selected = this.SELECTED_WOOD;
        this.spr_bar.setTexture('inventory_wood');
        this.context.ui.createBuildCursor('wood');
    }

    selectStone() {
        this.selected = this.SELECTED_STONE;
        this.spr_bar.setTexture('inventory_stone');
        this.context.ui.createBuildCursor('stone');
    }

    selectIron() {
        this.selected = this.SELECTED_IRON;
        this.spr_bar.setTexture('inventory_iron');
        this.context.ui.createBuildCursor('metal');
    }

    update() {
        this.updateItemCounts();
    }

    updateItemCounts() {
        this.wood_count_text.setText(this.wood_count);
        this.stone_count_text.setText(this.stone_count);
        this.iron_count_text.setText(this.iron_count);
    }
}