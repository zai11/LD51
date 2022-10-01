class InputController {

    KEY_W = 87;
    KEY_A = 65;
    KEY_S = 83;
    KEY_D = 68;
    KEY_1 = 49;
    KEY_2 = 50;
    KEY_3 = 51;
    KEY_4 = 52;
    KEY_5 = 53;
    KEY_6 = 54;
    KEY_SPACE = 32;
    KEY_DEBUG = 16;

    constructor(context, player) {
        this.context = context;
        this.player = player;

        this.pressed_w = false;
        this.pressed_a = false;
        this.pressed_s = false;
        this.pressed_d = false;
        this.pressed_1 = false;
        this.pressed_2 = false;
        this.pressed_3 = false;
        this.pressed_4 = false;
        this.pressed_5 = false;
        this.pressed_6 = false;
        this.pressed_space = false;
        this.pressed_debug = false;
        
        context.input.keyboard.on('keydown', (event) => {
            switch(event.keyCode) {
                case this.KEY_W:
                    this.pressed_w = true;
                    break;
                case this.KEY_A:
                    this.pressed_a = true;
                    break;
                case this.KEY_S:
                    this.pressed_s = true;
                    break;
                case this.KEY_D:
                    this.pressed_d = true;
                    break;
                case this.KEY_1:
                    this.pressed_1 = true;
                    break;
                case this.KEY_2:
                    this.pressed_2 = true;
                    break;
                case this.KEY_3:
                    this.pressed_3 = true;
                    break;
                case this.KEY_4:
                    this.pressed_4 = true;
                    break;
                case this.KEY_5:
                    this.pressed_5 = true;
                    break;
                case this.KEY_6:
                    this.pressed_6 = true;
                    break
                case this.KEY_SPACE:
                    this.pressed_space = true;
                    break;
                case this.KEY_DEBUG:
                    this.pressed_debug = true;
                    break;
            }
        });

        context.input.keyboard.on('keyup', (event) => {
            switch(event.keyCode) {
                case this.KEY_W:
                    this.pressed_w = false;
                    break;
                case this.KEY_A:
                    this.pressed_a = false;
                    break;
                case this.KEY_S:
                    this.pressed_s = false;
                    break;
                case this.KEY_D:
                    this.pressed_d = false;
                    break;
                case this.KEY_1:
                    this.pressed_1 = false;
                    break;
                case this.KEY_2:
                    this.pressed_2 = false;
                    break;
                case this.KEY_3:
                    this.pressed_3 = false;
                    break;
                case this.KEY_4:
                    this.pressed_4 = false;
                    break;
                case this.KEY_5:
                    this.pressed_5 = false;
                    break;
                case this.KEY_6:
                    this.pressed_6 = false;
                    break
                case this.KEY_SPACE:
                    this.pressed_space = false;
                    break;
                case this.KEY_DEBUG:
                    this.pressed_debug = false;
                    break;
            }
        });
    }
}