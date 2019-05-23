import { Component, OnInit, Input } from '@angular/core';
import { Friend } from '../Friend';
@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  @Input()
  name = '';
  @Input()
  publicKey = '';


  constructor() { }

  ngOnInit() {
  }

}
