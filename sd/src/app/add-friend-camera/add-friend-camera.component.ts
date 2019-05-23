import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Friend } from '../Friend';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
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

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  scan = '';
  currentDevice;

  constructor() { }

  ngOnInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.scan = JSON.stringify(devices);
      this.currentDevice = devices[2];
    });
  }

  scanCompleteHandler(e) {
    this.scan = JSON.stringify(e);
  }
}
