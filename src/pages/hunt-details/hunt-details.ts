import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { LocationListPage } from '../location-list/location-list';

import { Hunt } from '../../models/hunt';

@Component({
  selector: 'page-hunt-details',
  templateUrl: 'hunt-details.html'
})
export class HuntDetailsPage {

  hunt: Hunt;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
    this.hunt = <Hunt> navParams.get('hunt');
  }

  ionViewDidLoad() {
  }

  start(){
    this.navCtrl.push(LocationListPage);
  }
}