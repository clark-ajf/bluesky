import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import { GooglePlus } from '@ionic-native/google-plus';

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

  constructor(public navCtrl: NavController, public googlePlus: GooglePlus) { }

  login() {
    this.navCtrl.push(LoginPage);
    /*this.googlePlus.login({
          'webClientId': '642810877670-e6ucbbgl8u53tie8mmac9iv73v02v4ma.apps.googleusercontent.com'
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });*/
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
