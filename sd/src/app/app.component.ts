import { Component } from '@angular/core';
import { ConnectionService } from './connection.service';
import { FormControl, Validators } from '@angular/forms';
import { Message } from './Message';
import { CssKeyframesDriver } from '@angular/animations/browser/src/render/css_keyframes/css_keyframes_driver';

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

  constructor(private cs: ConnectionService) {
    cs.onMessage.subscribe(this.onMessage);
  }

  onMessage = (m) => {
    console.log(m);
    const msg = new Message(JSON.parse(m));
    this.messages.push(msg);
    setTimeout(() => {document.getElementById('scroll').scrollTo(0, 999999999); }, 100);
  }

  send = () => {
    const msg = new Message({ message: this.chatInput.value, to: this.cs.to, from: this.cs.name});
    this.cs.ws.send(JSON.stringify(msg));
    // this.messages.push({message: this.chatInput.value, self: false, sender: 'afd'});
    this.chatInput.setValue('');
    console.log(scroll);
    setTimeout(() => {document.getElementById('scroll').scrollTo(0, 999999999); });
  }
}

