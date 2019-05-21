export class Message {

    constructor(o: Message) {
        Object.assign(this, o);
    }

    from: string;
    to: string;
    message: string;
    self: boolean;
}
