import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { HuntDetailsPage } from '../hunt-details/hunt-details';
import { HuntCreatePage } from '../hunt-create/hunt-create';
import { SearchPage } from '../search/search';

import { SessionData } from '../../providers/session.data';
import { HuntService } from '../../providers/hunt.service';

import { Hunt } from '../../models/hunt';
import { User } from '../../models/user';


@Component({
  selector: 'page-my-hunts',
  templateUrl: 'my-hunts.html'
})
export class MyHuntsPage {
  activeHunts: Hunt[];
  myHunts: Hunt[];
  completedHunts: Hunt[];
  user: User;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private sessionData: SessionData, private huntService: HuntService) {

    this.activeHunts = [
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

  loadData() {
    this.huntService.getHuntsByUser(this.user._id).subscribe(hunts => {
      this.completedHunts = hunts;
    });
  }

  ngAfterViewInit() {
    this.getUserData();
  }

  getUserData() {
     return this.sessionData.getUser().then((user: User) => {
      this.user = user;
      this.loadData();
      return;
    });
  }

  addHunt(){
    this.navCtrl.push(HuntCreatePage);
  }

  joinHunt(){
    this.navCtrl.push(SearchPage);
  }

  archive(item: Hunt){

  }
  mute(item: Hunt){
        
  }
  more(item: Hunt){
    this.navCtrl.push(HuntDetailsPage, { hunt: item });
  }
}
