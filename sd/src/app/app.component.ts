import { Component } from '@angular/core';
import { ConnectionService } from './connection.service';
import { FormControl, Validators } from '@angular/forms';
import { Message } from './Message';
import { MatDialog } from '@angular/material';
import { PromptComponent } from './prompt/prompt.component';
import { FriendsComponent } from './friends/friends.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendsService } from './friends.service';
declare var cryptoLib: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  messages = [];
  chatInput = new FormControl('', []);
  placeholder = '';
  color = 'primary';

  constructor(private cs: ConnectionService, private friendsService: FriendsService, public dialog: MatDialog) {
    cs.onMessage.subscribe(this.onMessage);
  }

  onMessage = (m) => {
    console.log(m);
    const msg = new Message(JSON.parse(m));
    msg.self = msg.from === this.cs.name;
    this.messages.push(msg);
    setTimeout(() => {document.getElementById('scroll').scrollTo(0, 999999999); }, 100);
  }

  send = () => {
    const msg = new Message({ message: this.chatInput.value, to: this.cs.to, from: this.cs.name, self: undefined});
    this.cs.ws.send(JSON.stringify(msg));
    // this.messages.push({message: this.chatInput.value, self: false, sender: 'afd'});
    this.chatInput.setValue('');
    console.log(scroll);
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
        this.friendsService.friends.push(x);
      }
    });
  }

}

