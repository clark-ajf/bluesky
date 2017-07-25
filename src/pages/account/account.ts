import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,) {
  } 

  ionViewDidLoad() {
    // Build an empty form for the template to render
  }  
}
