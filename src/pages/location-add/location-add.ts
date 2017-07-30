import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';



@Component({
  selector: 'page-location-add',
  templateUrl: 'location-add.html'
})

export class LocationAddPage {

  constructor(params: NavParams, public viewCtrl: ViewController) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  selectProperty(location) {
    this.viewCtrl.dismiss(location);
  }
}