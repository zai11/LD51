class UI {

    constructor(context) {
        this.context = context;

        this.ui_objects = {};

        let spr_heart = this.context.add.sprite(100, 100, 'ui_heart');
        spr_heart.setScrollFactor(0);
        spr_heart.depth = Infinity;
        spr_heart.setScale(2);

        this.ui_objects['heart'] = spr_heart;

        let heart_text = this.context.add.text(100, 100, '5', {fontSize: '32px', fill: '#000'});
        heart_text.setOrigin(0.5);
        heart_text.setScrollFactor(0);
        heart_text.depth = Infinity;

        this.ui_objects['heart_text'] = heart_text;

        let wave_timer = this.context.add.text(1500, 100, '10', {fontSize: '32px', fill: '#000'});
        wave_timer.setOrigin(0.5);
        wave_timer.setScrollFactor(0);
        wave_timer.depth = Infinity;

        this.ui_objects['timer'] = wave_timer;

        let inventoryBar = new InventoryBar(this.context);
        inventoryBar.wood_count = 5;
        inventoryBar.stone_count = 15;
        this.ui_objects['inventoryBar'] = inventoryBar;
    }

    update() {
        this.ui_objects['timer'].setText(this.context.timer);
        this.ui_objects['heart_text'].setText(this.context.lives);
        this.ui_objects['inventoryBar'].update();
    }
}