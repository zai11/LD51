class InputController {

    W_KEY = 87;
    A_KEY = 65;
    S_KEY = 83;
    D_KEY = 68;
    SPACE_KEY = 32;
    DEBUG_KEY = 16;

    constructor(context, player) {
        this.context = context;
        this.player = player;

        this.w_pressed = false;
        this.a_pressed = false;
        this.s_pressed = false;
        this.d_pressed = false;
        this.space_pressed = false;
        this.debug_pressed = false;
        
        context.input.keyboard.on('keydown', (event) => {
            switch(event.keyCode) {
                case this.W_KEY:
                    this.w_pressed = true;
                    break;
                case this.A_KEY:
                    this.a_pressed = true;
                    break;
                case this.S_KEY:
                    this.s_pressed = true;
                    break;
                case this.D_KEY:
                    this.d_pressed = true;
                    break;
                case this.SPACE_KEY:
                    this.space_pressed = true;
                    break;
                case this.DEBUG_KEY:
                    this.debug_pressed = true;
                    break;
            }
        });

        context.input.keyboard.on('keyup', (event) => {
            switch(event.keyCode) {
                case this.W_KEY:
                    this.w_pressed = false;
                    break;
                case this.A_KEY:
                    this.a_pressed = false;
                    break;
                case this.S_KEY:
                    this.s_pressed = false;
                    break;
                case this.D_KEY:
                    this.d_pressed = false;
                    break;
                case this.SPACE_KEY:
                    this.space_pressed = false;
                    break;
                case this.DEBUG_KEY:
                    this.debug_pressed = false;
                    break;
            }
        });
    }
}