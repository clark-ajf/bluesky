import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { HuntDetailsPage } from '../hunt-details/hunt-details';

import { Hunt } from '../../models/hunt';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  currentHunts: Hunt[] = [];

  hunts: Hunt[] = [];

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    this.hunts = [
      {
        img: 'assets/img/speakers/cmu.jpg',
        name: 'CMU Silicon Valley',
        message: 'Explore CMU Silicon Valley',
        time: '9:38 pm',
        locations: []
      }, {
        img: 'assets/img/speakers/car.jpg',
        name: 'Fake Car Intern Welcome',
        message: 'Fake Car Intern Orientation',
        time: '8:59 pm',
        locations: []
      }, {
        img: 'assets/img/speakers/mtv.jpg',
        name: 'Mountain View Mission',
        message: 'Discover the coolest sights in Mountain View',
        time: 'Wed',
        locations: []
      }];
  }

  getHunts(event) {
    let value = event.target.value;
    if (!value || !value.trim()) {
      this.currentHunts = [];
      return;
    }
    this.currentHunts = this.hunts.filter((hunt) => {
      return (hunt.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (hunt.message.toLowerCase().indexOf(value.toLowerCase()) > -1);
    });
  }

  openHunt(hunt: Hunt) {
    this.navCtrl.push(HuntDetailsPage, {
      hunt: hunt
    });
  }
}