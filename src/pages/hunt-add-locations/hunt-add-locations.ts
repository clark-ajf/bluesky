import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { LocationAddPage } from '../location-add/location-add';
import { MyHuntsPage } from '../my-hunts/my-hunts';

import { HuntService } from '../../providers/hunt.service';

import { Hunt } from '../../models/hunt';
import { Location } from '../../models/location';

@Component({
  selector: 'page-hunt-add-locations',
  templateUrl: 'hunt-add-locations.html'
})
export class HuntAddLocationsPage {

  private hunt: Hunt;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController, private huntService: HuntService) {
      this.hunt = <Hunt> navParams.get('hunt');
  }

  ionViewDidLoad() {}

  publishHunt(){
    if(this.hunt._id != ''){
      this.huntService.updateHunt(this.hunt).subscribe(hunt => {
        console.log(hunt);
        this.navCtrl.setRoot(MyHuntsPage);
      });
    }else{      
      this.huntService.saveHunt(this.hunt).subscribe(hunt => {
        console.log(hunt);
        this.navCtrl.setRoot(MyHuntsPage);
      });
    }
  }

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
