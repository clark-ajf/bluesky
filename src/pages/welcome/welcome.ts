import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { GooglePlus } from '@ionic-native/google-plus';

import { SessionData } from '../../providers/session.data';
import { UserService } from '../../providers/user.service';

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

  constructor(public navCtrl: NavController, public googlePlus: GooglePlus, private sessionData: SessionData, private userService: UserService) { }

  signupGoogle(){
    this.googlePlus.login({
      'webClientId': '642810877670-e6ucbbgl8u53tie8mmac9iv73v02v4ma.apps.googleusercontent.com'
    }).then((response) => {
      if(response){
        response.organizer = false;
        this.userService.loginOrSignUp(response).subscribe(user => {
          if(user){
            this.sessionData.login(user);
            this.navCtrl.setRoot(TabsPage);
          }else{            
            console.log('API Login/Signup failed');
          }
        });
      }else{
        console.log('Google Plus Login/SignUp failed');
      }
    }, (error) => {
        console.log(error);
    });
  }

  testLogin(){
    //Creating dummy user to skip the login process in the browser (GooglePlus only works running the app in the device)
    this.sessionData.login({displayName: 'Test User', email: 'test@cmu.edu', familyName: 'User', givenName: 'Test', idToken: '0', imageUrl: 'http://www.gravatar.com/avatar?d=mm&s=140', userId: 0, organizer: true});
    this.navCtrl.setRoot(TabsPage);
  }
}
