import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.groups = JSON.parse(localStorage.messages || '{}');
  }

  groups = {};
  seen = {};

  see(gid) {
    this.seen[gid] = (this.groups[gid] || []).length;
  }

  groupMessage(msg) {
    const guid = msg.msg.guid;
    if (!this.groups[guid]) {
      this.groups[guid] = [];
    }

    this.groups[guid].push(msg);
    localStorage.setItem('messages', JSON.stringify(this.groups));
  }

  getMessages() {
    return this.groups;
  }

}
