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
  currentDevice: MediaDeviceInfo;
  availableDevices: MediaDeviceInfo[];
  constructor() { }

  ngOnInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.availableDevices = devices;
    });
  }

  scanCompleteHandler(e) {
    this.scan = e.text;
    this.publicKey = e.text;
  }

  onDeviceSelectChange(selected: string) {
    // console.debug('Selection changed: ', selected);
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }
}
