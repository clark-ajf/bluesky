import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { LocationDetailsPage } from '../location-details/location-details';

import { SessionData } from '../../providers/session.data';
import { LocationService } from '../../providers/location.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private sessionData: SessionData, private locationService: LocationService) {
    this.hunt = <Hunt> navParams.get('hunt');
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
      this.locationService.getHuntLocationsByUser(this.user._id, this.hunt._id).subscribe(locations => {
        this.locations = locations;
      }, error => {
        console.log(error);
      })
      return;
    });
  }
  
  more(item: Location){
    this.navCtrl.push(LocationDetailsPage, { location: item });
  }
}
