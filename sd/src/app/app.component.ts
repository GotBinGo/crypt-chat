import { Component, OnInit } from '@angular/core';
import { ConnectionService } from './connection.service';
import { FormControl, Validators } from '@angular/forms';
import { Message } from './Message';
import { MatDialog } from '@angular/material';
import { PromptComponent } from './prompt/prompt.component';
import { FriendsComponent } from './friends/friends.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendsService } from './friends.service';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupService } from './group.service';
import { Group } from './Group';
declare var cryptoLib: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  messages = [];
  chatInput = new FormControl('', []);
  placeholder = '';
  color = 'primary';
  groups = [];

  constructor(private cs: ConnectionService,
    private friendsService: FriendsService,
    private groupService: GroupService,
    public dialog: MatDialog) {
    cs.onMessage.subscribe(this.onMessage);
  }

  ngOnInit() {
    this.groups = this.groupService.getGroups();
  }

  onMessage = (m) => {
    const msg = JSON.parse(m);
    console.log(msg);
    if (msg.msg.type === 'HELLO') {
      this.groupService.addGroup(<Group>{name: msg.msg.guid, users: msg.msg.participants});
      this.groups = this.groupService.getGroups();
    } else if (msg.msg.type === 'MESSAGE') {
      msg.self = true;
      this.messages.push(msg);
      setTimeout(() => {document.getElementById('scroll').scrollTo(0, 999999999); }, 100);
    }
  }

  send = (to: string, msg: Message) => {
    // const msg = new Message({ message: this.chatInput.value, to: this.cs.to, from: this.cs.name, self: undefined});
    this.cs.ws.send(JSON.stringify({to, msg}));
    // this.messages.push({message: this.chatInput.value, self: false, sender: 'afd'});
    this.chatInput.setValue('');
    setTimeout(() => {document.getElementById('scroll').scrollTo(0, 999999999); });
  }

  showPublicKey = () => {
    const dialogRef = this.dialog.open(PromptComponent, {
      width: '40%',
      data: {pre: JSON.parse(localStorage.keyPair).publicKey.trim()},
      disableClose: false
    });
    dialogRef.componentInstance.text = '';
  }

  listFriends = () => {
    const dialogRef = this.dialog.open(FriendsComponent, {
      width: '40%',
      height: '60%',
      data: {pre: JSON.parse(localStorage.keyPair).publicKey.trim()},
      disableClose: false
    });
  }

  addFriend = () => {
    const dialogRef = this.dialog.open(AddFriendComponent, {
      width: '40%',
      data: {pre: JSON.parse(localStorage.keyPair).publicKey.trim()},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(x => {
      if (x) {
        this.friendsService.addFriend(x);
      }
    });
  }

  createGroup = () => {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '40%',
      height: '60%',
      data: {pre: JSON.parse(localStorage.keyPair).publicKey.trim()},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(async (x: Group) => {
      if (x && x.name && x.users.length) {
        const a = new Message({
          type: 'HELLO',
          from: JSON.parse(localStorage.keyPair).publicKey,
          guid: x.name,
          ts: + new Date(),
          participants: x.users.map(y => y.publicKey)
        });
        this.send(await this.cs.hashString(JSON.parse(localStorage.keyPair).publicKey), a);
        for (const f of x.users.map(y => y.publicKey)) {
          this.send(await this.cs.hashString(f), a);

        }
      }
    });
  }

  openGroup = (g: Group) => {
    console.log(g);
  }

}

