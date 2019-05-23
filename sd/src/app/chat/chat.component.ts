import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { Message } from '../Message';
import { Group } from '../Group';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private cs: ConnectionService, private friendsService: FriendsService) { }

  chatInput = '';
  @Input()
  messages: any = [];

  @Input()
  group: Group = null;

  ngOnInit() {
  }

  onSend = async () => {
    const a = new Message({
      type: 'MESSAGE',
      from: JSON.parse(localStorage.keyPair).publicKey,
      guid: this.group.name,
      ts: + new Date(),
      data_type: 'TEXT',
      data: this.chatInput
    });
    // this.cs.send(await this.cs.hashString(JSON.parse(localStorage.keyPair).publicKey), a); // self
    for (const f of this.group.users) { // group
      this.cs.send(await this.cs.hashString(f), a);
    }
    this.chatInput = '';
  }
}
