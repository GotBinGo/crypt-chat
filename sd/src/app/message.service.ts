import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.groups = JSON.parse(localStorage.messages || '{}');
    this.seen = JSON.parse(localStorage.seen || '{}');
  }

  groups = {};
  seen = {};

  see(gid) {
    this.seen[gid] = (this.groups[gid] || []).length;
    localStorage.seen = JSON.stringify(this.seen);
  }

  groupMessage(msg) {
    const guid = msg.msg.guid;
    if (!this.groups[guid]) {
      this.groups[guid] = [];
    }

    this.groups[guid].push(msg);
    localStorage.messages = JSON.stringify(this.groups);
  }

  getMessages() {
    return this.groups;
  }

}
