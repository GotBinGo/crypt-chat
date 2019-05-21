import { Injectable, Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  template: '<h4>{{text}}</h4><mat-form-field class="w-100"><input matInput autofocus (keyup.enter)="onClick()" [(ngModel)]="data.name"></mat-form-field> <button mat-button class="float-right" [mat-dialog-close]="data.name">Ok</button>',
})
export class PromptComponent {

  constructor(
    public dialogRef: MatDialogRef<PromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  text = 'Mi legyen a neved?';

  onClick(): void {
    this.dialogRef.close(this.data.name);
  }
}

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
    const dialogRef = this.dialog.open(PromptComponent, {
      width: '260px',
      data: {name: ''},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
      this.ws = new this.wsImpl('ws://' + location.hostname + ':4201/' + this.name);
      this.ws.onmessage = (evt) => {
        this.subj.next(evt.data);
      };
      this.ws.onopen = () => {
        const dialogRef2 = this.dialog.open(PromptComponent, {
          width: '260px',
          data: {name: ''},
          disableClose: true
        });
        dialogRef2.componentInstance.text = 'Kinek küldesz?';
        dialogRef2.afterClosed().subscribe(result2 => {
          this.to = result2;
        });
      };
    });
  }
}
