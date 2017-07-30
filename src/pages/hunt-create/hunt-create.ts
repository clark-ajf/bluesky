import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { LocationListPage } from '../location-list/location-list';

import { Hunt } from '../../models/hunt';

@Component({
  selector: 'page-hunt-create',
  templateUrl: 'hunt-create.html'
})
export class HuntCreatePage {

  hunt: Hunt;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  next(){
    //this.navCtrl.push(LocationListPage);
  }
}
