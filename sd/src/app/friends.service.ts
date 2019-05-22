import { Injectable } from '@angular/core';
import { Friend } from './Friend';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor() { }

  addFriend(f: Friend) {
    const friends = this.getFriends();
    console.log(friends);
    friends.push(f);
    localStorage.friends = JSON.stringify(friends);
  }

  getFriends(): Friend[] {
    return JSON.parse(localStorage.friends || '[]');
  }
}
