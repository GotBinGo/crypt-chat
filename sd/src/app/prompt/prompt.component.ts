import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {

  @Input()
  text = 'Mi legyen a neved?';
  pre = '';

  constructor(
    public dialogRef: MatDialogRef<PromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.pre = data.pre;
    }

  ngOnInit() {
  }

  onClick(): void {
    this.dialogRef.close(this.data.name);
  }

}
