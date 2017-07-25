import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { LocationDetailsPage } from '../location-details/location-details';

import { Location } from '../../models/location';


@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html'
})
export class LocationListPage {
  locations: Location[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

    this.locations = [
      {
        qrToken: '1234',
        imageUrl: 'assets/img/locations/SV_campus.jpg',
        name: 'Location 1',
        description: 'Main building on Campus, with a sign hard to forget!',
        hints: [
            {message: 'Lorem Ipsum'}
        ]
      },
      {
        qrToken: '12345',
        imageUrl: 'assets/img/locations/cmu_sv_fence.jpg',
        name: 'Location 2',
        description: 'By today the colors should be different, it changes every year!',
        hints: [
            {message: 'Lorem Ipsum'}
        ]
      }];
  }

  ionViewDidLoad() {
  }
  
  more(item: Location){
    this.navCtrl.push(LocationDetailsPage, { location: item });
  }
}
