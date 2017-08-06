import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { HuntDetailsPage } from '../hunt-details/hunt-details';

import { Hunt } from '../../models/hunt';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  currentHunts: Hunt[] = [];

  hunts: Hunt[] = [];

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    this.hunts = [
      {
        _id: '',
        imageUrl: 'assets/img/speakers/cmu.jpg',
        name: 'CMU Silicon Valley',
        shortDescription: 'Explore CMU Silicon Valley',
        longDescription: '',
        isDeleted: false,
        owner: { _id: '', displayName: 'Test User', email: 'test@cmu.edu', familyName: 'User', givenName: 'Test', idToken: '0', imageUrl: 'http://www.gravatar.com/avatar?d=mm&s=140', userId: 0, organizer: true },
        locations: [
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
        }]
      }, {
        _id: '',
        imageUrl: 'assets/img/speakers/car.jpg',
        name: 'Fake Car Intern Welcome',
        shortDescription: 'Fake Car Intern Orientation',
        longDescription: '',
        isDeleted: false,
        owner: { _id: '', displayName: 'Test User', email: 'test@cmu.edu', familyName: 'User', givenName: 'Test', idToken: '0', imageUrl: 'http://www.gravatar.com/avatar?d=mm&s=140', userId: 0, organizer: true },
        locations: [
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
        }]
      }, {
        _id: '',
        imageUrl: 'assets/img/speakers/mtv.jpg',
        name: 'Mountain View Mission',
        shortDescription: 'Discover the coolest sights in Mountain View',
        longDescription: '',
        isDeleted: false,
        owner: { _id: '', displayName: 'Test User', email: 'test@cmu.edu', familyName: 'User', givenName: 'Test', idToken: '0', imageUrl: 'http://www.gravatar.com/avatar?d=mm&s=140', userId: 0, organizer: true },
        locations: [
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
        }]
      }];
  }

  getHunts(event) {
    let value = event.target.value;
    if (!value || !value.trim()) {
      this.currentHunts = [];
      return;
    }
    this.currentHunts = this.hunts.filter((hunt) => {
      return (hunt.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (hunt.shortDescription.toLowerCase().indexOf(value.toLowerCase()) > -1);
    });
  }

  openHunt(hunt: Hunt) {
    this.navCtrl.push(HuntDetailsPage, {
      hunt: hunt
    });
  }
}