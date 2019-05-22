import { Injectable } from '@angular/core';
import { Group } from './Group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() { }

  addGroup(g: Group) {
    const groups = this.getGroups();
    groups.push(g);
    localStorage.groups = JSON.stringify(groups);
  }

  getGroups() {
    return JSON.parse(localStorage.groups || '[]');
  }
}
