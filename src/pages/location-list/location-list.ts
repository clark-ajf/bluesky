import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController, Events } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams, public modalCtrl: ModalController, private locationService: LocationService, private huntService: HuntService, private toastCtrl: ToastController) {
    this.hunt = <Hunt> navParams.get('hunt');
    this.user = <User> navParams.get('user');

    this.locationService.getHuntLocationsByUser(this.user._id, this.hunt._id).subscribe(locations => {
      this.locations = locations;
      this.checkCompletion();
    }, error => {
      console.log(error);
    })

    this.events.subscribe('location:found', () => {
      this.checkCompletion();
    });
  }

  checkCompletion(){
    if(typeof this.hunt.status !== 'undefined'){
      if(this.hunt.status != 'complete'){
        if(this.locations.filter(location => location.status == 'found').length == this.locations.length){
          this.huntService.completeHunt(this.user._id, this.hunt._id).subscribe(result => {
            this.hunt.status = 'complete';
            this.events.publish('hunts:reload');
            const toast = this.toastCtrl.create({
                message: 'Congratulation You Completed the Hunt!',
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 3000
            });
            toast.present();
          });
        }
      }
    }    
  }
  
  more(item: Location){
    this.navCtrl.push(LocationDetailsPage, { location: item, user: this.user });
  }
}
