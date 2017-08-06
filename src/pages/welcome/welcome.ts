import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public googlePlus: GooglePlus, private sessionData: SessionData, private userService: UserService, private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

  signupGoogle(){
    let loading = this.loadingCtrl.create({content: 'Loading...'});
    this.googlePlus.login({
      'webClientId': '642810877670-e6ucbbgl8u53tie8mmac9iv73v02v4ma.apps.googleusercontent.com'
    }).then((response) => {
      if(response){
        response.organizer = false;
        this.userService.loginOrSignUp(response).subscribe(user => {
          loading.dismiss();
          if(user){
            this.sessionData.login(response);
            this.navCtrl.setRoot(TabsPage);
          }else{
            this.showMessage('API Login/Signup failed');
          }
        });
      }else{
        loading.dismiss();
        this.showMessage('Google Plus Login/SignUp failed');
      }
    }, (error) => {
      loading.dismiss();
      console.log(error);
    });
  }

  //Creating dummy user to skip the login process in the browser (GooglePlus only works running the app in the device)
  testLogin(){
    let loading = this.loadingCtrl.create({content: 'Loading...'});
    
    let dummyUser: {displayName: 'Test User', email: 'test@cmu.edu', familyName: 'User', givenName: 'Test', idToken: '0', imageUrl: 'http://www.gravatar.com/avatar?d=mm&s=140', userId: 0, organizer: true}
    this.userService.loginOrSignUp(dummyUser).subscribe(user => {
      loading.dismiss();
      if(user){
        this.sessionData.login(dummyUser);
        this.navCtrl.setRoot(TabsPage);
      }else{
        this.showMessage('API Login/Signup failed');
      }
    });
  }

  showMessage(message: string){
    const toast = this.toastCtrl.create({
        message: message,
        showCloseButton: true,
        closeButtonText: 'Ok'
    });
    toast.present();
  }
}
