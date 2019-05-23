import { Component, OnInit, Input } from '@angular/core';
import { Friend } from '../Friend';
@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend-camera.component.html',
  styleUrls: ['./add-friend-camera.component.css']
})
export class AddFriendCameraComponent implements OnInit {

  @Input()
  name = '';
  @Input()
  publicKey = '';

  scan = '';

  constructor() { }

  ngOnInit() {
  }

  scanCompleteHandler(e) {
    this.scan = JSON.stringify(e);
  }
}
