import { Injectable } from '@angular/core';
import { Group } from 'three';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() { }

  groups = [];
  addGroup(g: Group) {
    this.groups.push(g);
  }

  getGroups() {
    return this.groups;
  }
}
