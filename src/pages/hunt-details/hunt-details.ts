import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Events } from 'ionic-angular';

import { LocationListPage } from '../location-list/location-list';

import { HuntService } from '../../providers/hunt.service';

import { Hunt } from '../../models/hunt';
import { User } from '../../models/user';

@Component({
  selector: 'page-hunt-details',
  templateUrl: 'hunt-details.html'
})
export class HuntDetailsPage {

  hunt: Hunt;
  user: User;

  constructor(public navCtrl: NavController, public events: Events, public modalCtrl: ModalController, public navParams: NavParams, private huntService: HuntService) {
    this.hunt = <Hunt> navParams.get('hunt');
    this.user = <User> navParams.get('user');
  }

  start(){
      if(typeof this.hunt.status !== 'undefined' && (this.hunt.status == 'active' || this.hunt.status == 'complete')){
        return this.continue();
      }
      this.huntService.activateHunt(this.user._id, this.hunt._id).subscribe(result => {
        this.hunt.status = 'active';
        this.events.publish('hunts:reload');
        this.navCtrl.push(LocationListPage, {hunt: this.hunt, user: this.user});
      });
  }

  continue(){
    this.navCtrl.push(LocationListPage, {hunt: this.hunt, user: this.user});
  }
}
