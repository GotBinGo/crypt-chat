import { Injectable, Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PromptComponent } from './prompt/prompt.component';
declare var cryptoLib: any;

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  wsImpl = window['WebSocket'] || window['MozWebSocket'];
  ws = null;

  subj = new Subject<number>();
  onMessage = this.subj.asObservable();

  to: string = null;
  name: string = null;

  constructor(public dialog: MatDialog) {
    console.log('connected');

    if (localStorage.keyPair) {
      const savedKey = JSON.parse(localStorage.keyPair);
      this.connect(savedKey);
    } else {
      cryptoLib.createKeyPair().then(keyPair => {
        localStorage.keyPair = JSON.stringify(keyPair);
        this.connect(keyPair);
      });
    }
  }

  connect = async (keyPair) => {
      this.name = await this.hashString(keyPair.publicKey);
      this.ws = new this.wsImpl('ws://' + location.hostname + ':4201/' + this.name);
      this.ws.onmessage = (evt) => {
        this.subj.next(evt.data);
      };
      this.ws.onopen = () => {
      };
  }

  hashString(str) {
    str = str.trim();
    const buf = new ArrayBuffer(str.length * 2);
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return crypto.subtle.digest('SHA-256', buf)
    .then(x => String.fromCharCode.apply(null, new Uint8Array(x)))
    .then(x => encodeURIComponent(btoa(x)))
    .then(x => x.split('%').join(''));
  }
}
