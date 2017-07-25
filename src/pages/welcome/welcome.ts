import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { GooglePlus } from '@ionic-native/google-plus';

import { SessionData } from '../../providers/session.data';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public googlePlus: GooglePlus, private sessionData: SessionData) { }

  signupGoogle(){
    this.googlePlus.login({
      'webClientId': '642810877670-e6ucbbgl8u53tie8mmac9iv73v02v4ma.apps.googleusercontent.com'
    }).then((res) => {
        console.log('good');
        console.log(res);
        this.sessionData.login(res);
        this.navCtrl.setRoot(TabsPage);
    }, (err) => {
        console.log(err);
    });
  }

  testLogin(){
    this.sessionData.login({displayName: 'Test User', email: 'test@cmu.edu', familyName: 'User', givenName: 'Test', idToken: '0', imageUrl: 'http://www.gravatar.com/avatar?d=mm&s=140', userId: 0});
    this.navCtrl.setRoot(TabsPage);
  }
}
