import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  tab1Root: any = MyHuntsPage;
  tab2Root: any = SearchPage;
  tab3Root: any = AccountPage;

  tab1Title = "My Hunts";
  tab2Title = "Search";
  tab3Title = "Account";

  constructor(public navCtrl: NavController, public translateService: TranslateService, private sessionData: SessionData, private googlePlus: GooglePlus) {
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

  logout() {
    this.sessionData.logout();
    this.googlePlus.logout();
    this.navCtrl.setRoot(WelcomePage);
  }
}
