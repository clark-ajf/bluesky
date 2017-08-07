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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private sessionData: SessionData, private huntService: HuntService) {}

  loadData() {
    this.huntService.getHuntsByUserAndStatus(this.user._id, 'active').subscribe(hunts => {
      this.activeHunts = hunts;
    });
    this.huntService.getHuntsByUserAndStatus(this.user._id, 'owned').subscribe(hunts => {
      this.myHunts = hunts;
    });
    this.huntService.getHuntsByUserAndStatus(this.user._id, 'complete').subscribe(hunts => {
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
    this.navCtrl.push(HuntCreatePage, { user: this.user });
  }

  joinHunt(){
    this.navCtrl.push(SearchPage);
  }

  archive(item: Hunt){
    this.huntService.deleteHunt(item._id).subscribe(result => {
      this.completedHunts = this.completedHunts.filter(hunt => hunt !== item);  
      this.activeHunts = this.activeHunts.filter(hunt => hunt !== item);  
      this.myHunts = this.myHunts.filter(hunt => hunt !== item);    
    });
  }

  editHunt(item: Hunt){
    this.navCtrl.push(HuntCreatePage, { user: this.user, hunt: item }); 
  }
  
  more(item: Hunt){
    this.navCtrl.push(HuntDetailsPage, { hunt: item, user: this.user });
  }
}
