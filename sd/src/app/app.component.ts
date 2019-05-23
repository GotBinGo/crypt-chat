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
import { Friend } from './Friend';
import { MessageService } from './message.service';
import { AddFriendCameraComponent } from './add-friend-camera/add-friend-camera.component';
declare var cryptoLib: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  messages = [];
  placeholder = '';
  color = 'primary';
  groups = [];
  selectedGroup = null;

  constructor(private cs: ConnectionService,
    private friendsService: FriendsService,
    private groupService: GroupService,
    private messageService: MessageService,
    public dialog: MatDialog) {
    cs.onMessage.subscribe(this.onMessage);
  }

  msgCount(gid) {
    const unseen = (this.messageService.getMessages()[gid] || []).length - (this.messageService.seen[gid] || 0);
    return unseen === 0 ? '' : unseen;
  }

  ngOnInit() {
    this.groups = this.groupService.getGroups();
  }

  onMessage = async (m) => {
    const msg = JSON.parse(m);
    if (msg.msg.type === 'HELLO') {

      const knownNames = this.friendsService.getFriends();
      knownNames.push({publicKey: JSON.parse(localStorage.keyPair).publicKey, name: 'self'});
      const incomingNames = msg.msg.participants;
      const newPeople = incomingNames.filter(x => knownNames.map(y => y.publicKey.trim()).indexOf(x.publicKey.trim()) === -1);
      // TODO csak akkor elfogadni, ha már ismerős
      newPeople.forEach(x => { // ismeretlen csoporttagok felvétele, célszerű lenne megerősítés
        this.friendsService.addFriend(<Friend>{name: x.name, publicKey: x.publicKey});
      });


      this.groupService.addGroup(<Group>{name: msg.msg.guid, users: [...msg.msg.participants.map(x => x.publicKey), msg.msg.from]});
      const idx = this.groups.indexOf(this.selectedGroup);
      this.groups = this.groupService.getGroups();
      this.selectedGroup = this.groups[idx];
    } else if (msg.msg.type === 'MESSAGE') {
      msg.self = await this.cs.hashString(msg.msg.from) === msg.to;
      if (!msg.self) {
        msg.fromName = this.friendsService.getFriends().filter(x => msg.msg.from.trim() === x.publicKey.trim())[0].name;
      }

      this.messageService.groupMessage(msg);
      if (this.selectedGroup) {
        this.messageService.see(this.selectedGroup.name);
        this.messages = this.messageService.getMessages()[this.selectedGroup.name];
      }
      setTimeout(() => {document.getElementById('scroll').scrollTo(0, 999999999); }, 1);
    }
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
  addFriendCamera = () => {
    const dialogRef = this.dialog.open(AddFriendCameraComponent, {
      width: '40%',
      height: '60%',
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
          participants: x.users
        });
        this.cs.send(await this.cs.hashString(JSON.parse(localStorage.keyPair).publicKey), a); // self
        for (const f of x.users.map(y => y.publicKey)) { // group
          this.cs.send(await this.cs.hashString(f), a);
        }
      }
    });
  }

  openGroup = (g: Group) => {
    this.selectedGroup = g;
    this.messages = this.messageService.getMessages()[g.name];
    this.messageService.see(g.name);
    setTimeout(() => {document.getElementById('scroll').scrollTo(0, 999999999); }, 1);
  }

  deleteGroups() {
    this.groupService.deleteAllGroups();
    this.groups = [];
    this.messages = [];
  }

  deleteMessages() {
    this.messageService.groups = {};
    localStorage.messages = {};
  }

}

