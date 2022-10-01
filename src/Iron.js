class Iron {
    constructor(context, environment, spr_iron) {
        this.context = context;
        this.environment = environment;
        this.spr_iron = spr_iron;

        spr_iron.setScale(3);
        spr_iron.depth = spr_iron.y - 40;
    }
}