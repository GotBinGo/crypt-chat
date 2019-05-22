import { Injectable, Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
declare var cryptoLib: any;

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  wsImpl = window['WebSocket'] || window['MozWebSocket'];
  ws = null;

  subj = new Subject<number>();
  onMessage = this.subj.asObservable();

  name: string = null;
  to: string = null;

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

  connect = (keyPair) => {
      this.ws = new this.wsImpl('ws://' + location.hostname + ':4201/' + this.name);
      this.ws.onmessage = (evt) => {
        this.subj.next(evt.data);
      };
      this.ws.onopen = () => {
      };
  }
}
