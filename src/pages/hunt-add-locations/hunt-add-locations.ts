import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { LocationAddPage } from '../location-add/location-add';

import { Hunt } from '../../models/hunt';
import { Location } from '../../models/location';

@Component({
  selector: 'page-hunt-add-locations',
  templateUrl: 'hunt-add-locations.html'
})
export class HuntAddLocationsPage {

  private hunt: Hunt;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
      this.hunt = <Hunt> navParams.get('hunt');
  }

  ionViewDidLoad() {}

  publishHunt(){}

  editLocation(location: Location){
    let modal = this.modal.create(LocationAddPage, {location: location});
    modal.onDidDismiss(data => {
      if(data){
        this.hunt.locations.push(data);
      }
    });
    modal.present();
  }

  addLocation(){
    let modal = this.modal.create(LocationAddPage);
    modal.onDidDismiss(data => {
      if(data){
        this.hunt.locations.push(data);
      }
    });
    modal.present();
  }
}
