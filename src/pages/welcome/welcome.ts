import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ListMasterPage } from '../list-master/list-master';

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
        console.log(res.displayName);
        this.sessionData.login(res);
        this.navCtrl.setRoot(ListMasterPage);
    }, (err) => {
        console.log(err);
    });
  }
}
