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
    this.locations = [
      {
        _id: '',
        qrToken: 'mJ9YLW1pSmOGI98llLPyrlikKxVC803uuB+8uevVADc=',
        imageUrl: 'assets/img/locations/SV_campus.jpg',
        name: 'Location 1',
        description: 'Main building on Campus, with a sign hard to forget!',
        status: 'not_found',
        clues: [
            {message: 'Lorem Ipsum'}
        ]
      },
      {
        _id: '',
        qrToken: '12345',
        imageUrl: 'assets/img/locations/cmu_sv_fence.jpg',
        name: 'Location 2',
        description: 'By today the colors should be different, it changes every year!',
        status: 'found',
        clues: [
            {message: 'Lorem Ipsum'}
        ]
      }
    ];

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
