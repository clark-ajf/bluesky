import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { HuntDetailsPage } from '../hunt-details/hunt-details';
import { HuntCreatePage } from '../hunt-create/hunt-create';

import { Hunt } from '../../models/hunt';


@Component({
  selector: 'page-my-hunts',
  templateUrl: 'my-hunts.html'
})
export class MyHuntsPage {
  hunts: Hunt[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

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

  ionViewDidLoad() {
  }

  addHunt(){
    this.navCtrl.push(HuntCreatePage);
  }

  archive(item: Hunt){

  }
  mute(item: Hunt){
        
  }
  more(item: Hunt){
    this.navCtrl.push(HuntDetailsPage, { hunt: item });
  }
}
