import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-qr',
  templateUrl: './show-qr.component.html',
  styleUrls: ['./show-qr.component.css']
})
export class ShowQrComponent implements OnInit {

  @Input()
  text = 'Mi legyen a neved?';
  pre = '';

  elementType = 'url';
  constructor(
    public dialogRef: MatDialogRef<ShowQrComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.pre = data.pre;
    }

  ngOnInit() {
  }

  onClick(): void {
    this.dialogRef.close(this.data.name);
  }

}
