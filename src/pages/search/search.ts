import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { HuntDetailsPage } from '../hunt-details/hunt-details';

import { HuntService } from '../../providers/hunt.service';
import { SessionData } from '../../providers/session.data';

import { Hunt } from '../../models/hunt';
import { User } from '../../models/user';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  currentHunts: Hunt[] = [];
  user: User;
  hunts: Hunt[] = [];

  constructor(public navCtrl: NavController, public translateService: TranslateService, private huntService: HuntService, private sessionData: SessionData) {}

  ngAfterViewInit() {
    this.getUserData();
  }

  getUserData() {
     return this.sessionData.getUser().then((user: User) => {
      this.user = user;
      this.huntService.getHunts().subscribe(hunts => {
        this.hunts = hunts;
      });
      return;
    });
  }

  getHunts(event) {
    let value = event.target.value;
    if (!value || !value.trim()) {
      this.currentHunts = [];
      return;
    }
    this.currentHunts = this.hunts.filter((hunt) => {
      return (hunt.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (hunt.shortDescription.toLowerCase().indexOf(value.toLowerCase()) > -1);
    });
  }

  openHunt(hunt: Hunt) {
    this.navCtrl.push(HuntDetailsPage, {
      hunt: hunt,
      user: this.user
    });
  }
}