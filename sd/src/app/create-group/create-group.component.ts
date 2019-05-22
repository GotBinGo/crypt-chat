import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { Friend } from '../Friend';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  friends = [];
  dataSource = new MatTableDataSource<Friend>(this.friends);
  displayedColumns: string[] = ['name', 'checked'];

  constructor(private friendsService: FriendsService, public dialogRef: MatDialogRef<CreateGroupComponent>) {
    this.friends = friendsService.getFriends();
    this.dataSource = new MatTableDataSource<Friend>(this.friends);
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close(this.friends.filter(x => x.checked));
  }

}
