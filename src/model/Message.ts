export class Message {

    static num = 0;
    constructor(o: Message) {
        Object.assign(this, o);
        this.num = Message.num++;
    }

    from: string;
    to: string;
    message: string;
    num: number;
}
