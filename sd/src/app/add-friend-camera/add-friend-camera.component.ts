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
    this.scan = 'elk';
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      for (const a of devices) {
        this.scan = a.deviceId;
        this.currentDevice = a;
        break;
      }
    });
  }

  scanCompleteHandler(e) {
    this.scan = JSON.stringify(e);
  }
}
