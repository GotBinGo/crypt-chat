export class Message {

    constructor(o: Message) {
        Object.assign(this, o);
    }

    type: 'HELLO' | 'MESSAGE';
    from: string;
    guid: string;
    ts: number;

    data_type?: 'TEXT';
    data?: string;
    participants?: string[];
}

export class SignedMessage {
    message_body: string;
    message_sign: string;
}


export class EncryptedMessage {
    encrypted_symmetric_key: string;
    encrypted_data: string;
}
