import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

import { WelcomePage } from '../welcome/welcome';

import { SessionData } from '../../providers/session.data';
import { User } from '../../models/user';

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
  user: User;

  constructor(private app: App, public nav: NavController, public navParams: NavParams, private sessionData: SessionData, private googlePlus: GooglePlus) {
    this.sessionData.hasLoggedIn().then((hasLoggedIn: boolean) => {
      if (hasLoggedIn !== true) {
        this.logout();
      }
    });
  } 

  ionViewDidLoad() {
    // Build an empty form for the template to render
  }  

  ngAfterViewInit() {
    this.getUserData();
  }

  getUserData() {
     return this.sessionData.getUser().then((user: User) => {
      this.user = user;
      return;
    });
  }

  logout() {
    this.user = null;
    this.sessionData.logout();
    this.googlePlus.logout();
    this.app.getRootNavs()[0].setRoot(WelcomePage);
  }

  changeUser(){    
    this.user = null;
    this.sessionData.logout();
    this.googlePlus.disconnect();
    this.app.getRootNavs()[0].setRoot(WelcomePage);
  }
}
