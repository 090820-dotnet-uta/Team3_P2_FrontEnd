export class Preference {
    type: string;
    clicked: boolean;

    constructor(type: string, clicked: boolean){
        this.type = type;
        this.clicked = clicked;
    }
}