class ProgressBar {
    constructor(context, x, y, time) {
        this.context = context;
        this.time = time;
        this.border = this.context.add.sprite(x, y, 'progress_bar_border');
        this.bg = this.context.add.sprite(x-50, y-10, 'progress_bar_bg').setOrigin(0);
        this.border.setScale(2);
        this.border.depth = 9999;
        this.bg.setScale(2);
        this.bg.depth = Infinity;
        this.progress = 0;
        this.done = false;
        this.tick();
    }

    tick() {
        setTimeout(() => {
            this.progress++;
            if (this.progress >= 100) {
                this.progress = 100;
                this.done = true;
                return;
            }
            this.tick();
        }, this.time / 100);
    }

    update() {
        this.bg.setScale(this.progress / 50, 2);
    }

    destroy() {
        this.border.destroy();
        this.bg.destroy();
    }
}