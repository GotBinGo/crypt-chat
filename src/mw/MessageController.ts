import { Message } from "../model/Message";
import * as RedisSMQ from 'rsmq';

export class MessageController {

    constructor(private rsmq: RedisSMQ) {
    }

    async sendMessage(msg: Message) {
        try {
            var resp = await this.rsmq.createQueueAsync({qname: msg.to});
            if (resp === 1) {
                console.log("queue created for:" + msg.to)
            }
        } catch {}
        var resp2 = await this.rsmq.sendMessageAsync({qname: msg.to, message: JSON.stringify(msg)});
        if (resp2) {
            console.log("message sent to: ", msg.to, resp2);
        }
        var resp3 = await this.rsmq.sendMessageAsync({qname: msg.from, message: JSON.stringify(msg)});
        if (resp3) {
            console.log("message sent to: ", msg.to, resp3);
        }
        
    }

    async getMessage(userName: string): Promise<any> {
        var resp = await this.rsmq.popMessageAsync({qname: userName});
        // var resp = await this.rsmq.receiveMessageAsync({qname: userName, vt: 0.0});
        console.log("Message received.", resp)
        return resp;
    }

    async deleteMessage(userName: string, id: string) {
        var resp = await this.rsmq.deleteMessageAsync({qname: userName, id});
        console.log("Message deleted.", resp)
        return resp;
    }

}