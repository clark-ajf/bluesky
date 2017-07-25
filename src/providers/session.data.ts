import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { User } from '../models/user';

@Injectable()
export class SessionData {
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(public events: Events, public storage: Storage) {}

  login(user: User) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUser(user);
    this.events.publish('user:login');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.removeUser();
    this.events.publish('user:logout');
  }

  removeUser(){
    this.storage.remove('user');
  }

  setUser(user: User) {
    this.storage.set('user', user);
  }

  getUser() {
    return this.storage.get('user').then((value: User) => {
      return value;
    });
  }

  setUsername(userObj:User, displayName: string){
  // call DB to update too
    userObj.displayName = displayName;
    this.storage.set('user',userObj);
  }

  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }
}