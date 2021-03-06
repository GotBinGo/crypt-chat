import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Friend } from '../Friend';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})

export class FriendsComponent implements OnInit {
  dataSource = new MatTableDataSource<Friend>([]);
  displayedColumns: string[] = ['name', 'columndelete'];
  constructor(private friendsService: FriendsService) {
    this.dataSource = new MatTableDataSource<Friend>(this.friendsService.getFriends());
  }

  ngOnInit() {
  }

  delete(elm) {
    this.dataSource.data = this.dataSource.data
      .filter(i => i !== elm);
    this.friendsService.setFriends(this.dataSource.data);
  }
}
