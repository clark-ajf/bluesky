import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { MyHuntsPage } from '../my-hunts/my-hunts';
import { SearchPage } from '../search/search';
import { AccountPage } from '../account/account';

import { GooglePlus } from '@ionic-native/google-plus';

import { WelcomePage } from '../welcome/welcome';

import { SessionData } from '../../providers/session.data';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root: any = MyHuntsPage;
  tab2Root: any = SearchPage;
  tab3Root: any = AccountPage;

  index: number = 0;

  tab1Title = "My Hunts";
  tab2Title = "Search";
  tab3Title = "Account";

  constructor(public navCtrl: NavController, public params: NavParams, public translateService: TranslateService, private sessionData: SessionData, private googlePlus: GooglePlus) {
    if(this.params.get('tabIndex')){
      this.index = <number> this.params.get('tabIndex');
    }
    
    this.sessionData.hasLoggedIn().then((hasLoggedIn: boolean) => {
      if (hasLoggedIn !== true) {
        this.logout();
      }
    });

    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });
  }

  ionViewDidEnter() {
    this.tabRef.select(this.index);
  }

  logout() {
    this.sessionData.logout();
    this.googlePlus.logout();
    this.navCtrl.setRoot(WelcomePage);
  }
}
