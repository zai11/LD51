class UI {

    constructor(context) {
        this.context = context;

        this.ui_objects = {};

        let spr_heart = this.context.add.sprite(100, 100, 'ui_heart');
        spr_heart.setScrollFactor(0);
        spr_heart.depth =  this.context.WORLD_BOUNDS + 1;
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

        let inventoryBar = new InventoryBar(this.context, this);
        this.ui_objects['inventoryBar'] = inventoryBar;

        this.pointer = null;
    }

    createAxePointer(x, y) {
        this.clearPointer();
        this.pointer = this.context.add.sprite(x, y - 106, 'axe_pointer');
        this.pointer.depth = Infinity;
        this.pointer.setScale(1.5);
    }

    createPickPointer(x, y) {
        this.clearPointer();
        this.pointer = this.context.add.sprite(x, y - 60, 'pick_pointer');
        this.pointer.depth = Infinity;
        this.pointer.setScale(1.5);
    }

    clearPointer() {
        if (this.pointer != null) {
            this.pointer.destroy();
            this.pointer = null;
        }
    }

    createProgressBar(x, y, timer) {
        this.progressBar = new ProgressBar(this.context, x, y, timer);
    }

    createBuildCursor(material) {
        this.clearBuildCursor();
        this.build_cursor = new BuildCursor(this.context);

        switch(material) {
            case "wood":
                this.build_cursor.setWood();
                break;
            case "stone":
                this.build_cursor.setStone();
                break;
            case "metal":
                this.build_cursor.setMetal();
                break;
        }
    }

    clearBuildCursor() {
        if (this.build_cursor != null) {
            this.build_cursor.destroy();
            this.build_cursor = null;
        }
    }

    update() {
        this.ui_objects['timer'].setText(this.context.timer);
        this.ui_objects['heart_text'].setText(this.context.lives);
        this.ui_objects['inventoryBar'].update();
        if (this.progressBar != null) {
            this.progressBar.update();
            if (this.progressBar.done)
                this.progressBar.destroy();
        }

        if (this.build_cursor != null) {
            this.build_cursor.update();
        }
    }
}