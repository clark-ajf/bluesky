import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { LocationDetailsPage } from '../location-details/location-details';

import { LocationService } from '../../providers/location.service';
import { HuntService } from '../../providers/hunt.service';

import { User } from '../../models/user';
import { Location } from '../../models/location';
import { Hunt } from '../../models/hunt';


@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html'
})
export class LocationListPage {
  user: User;
  hunt: Hunt;
  locations: Location[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private locationService: LocationService, private huntService: HuntService) {
    this.hunt = <Hunt> navParams.get('hunt');
    this.user = <User> navParams.get('user');

    this.locationService.getHuntLocationsByUser(this.user._id, this.hunt._id).subscribe(locations => {
      this.locations = locations;
    }, error => {
      console.log(error);
    })
  }

  checkCompletion(){
    if(typeof this.hunt.status !== 'undefined'){
      if(this.hunt.status != 'complete'){
        if(this.locations.filter(location => location.status == 'found').length == this.locations.length){
          this.huntService.completeHunt(this.user._id, this.hunt._id).subscribe(result => {
            this.hunt.status = 'complete';
            //congrats!
          });
        }
      }
    }    
  }
  
  more(item: Location){
    this.navCtrl.push(LocationDetailsPage, { location: item, user: this.user });
  }
}
