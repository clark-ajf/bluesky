import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { HuntDetailsPage } from '../hunt-details/hunt-details';
import { HuntCreatePage } from '../hunt-create/hunt-create';
import { SearchPage } from '../search/search';

import { SessionData } from '../../providers/session.data';

import { Hunt } from '../../models/hunt';
import { User } from '../../models/user';


@Component({
  selector: 'page-my-hunts',
  templateUrl: 'my-hunts.html'
})
export class MyHuntsPage {
  activeHunts: Hunt[];
  myHunts: Hunt[];
  completedHunts: Hunt[];
  user: User;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private sessionData: SessionData) {

    this.activeHunts = [
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

  ionViewDidLoad() {
  }

  ngAfterViewInit() {
    this.getUserData();
  }

  getUserData() {
     return this.sessionData.getUser().then((user: User) => {
      this.user = user;
      return;
    });
  }

  addHunt(){
    this.navCtrl.push(HuntCreatePage);
  }

  joinHunt(){
    this.navCtrl.push(SearchPage);
  }

  archive(item: Hunt){

  }
  mute(item: Hunt){
        
  }
  more(item: Hunt){
    this.navCtrl.push(HuntDetailsPage, { hunt: item });
  }
}
