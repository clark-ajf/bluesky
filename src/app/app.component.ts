import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config, Events, MenuController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyHuntsPage } from '../pages/my-hunts/my-hunts';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { QRPage } from '../pages/qr/qr';

import { Settings } from '../providers/settings';
import { SessionData } from '../providers/session.data';

import { TranslateService } from '@ngx-translate/core';
import { GooglePlus } from '@ionic-native/google-plus';

import { User } from '../models/user';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class MyApp {
  rootPage = TabsPage;

  @ViewChild(Nav) nav: Nav;
  user: User;

  appPages: MenuItem[] = [
    { title: 'QR', component: QRPage, icon: 'qr-scanner' }
  ]

  loggedInPages: MenuItem[] = [
    { title: 'My Hunts', component: MyHuntsPage, icon: 'person' },
    { title: 'Settings', component: SettingsPage, icon: 'cog' },
    { title: 'Logout', component: WelcomePage, icon: 'log-out', logsOut: true }
  ];

  loggedOutPages: MenuItem[] = [
    { title: 'Login', component: WelcomePage, icon: 'log-in' },
    { title: 'Signup', component: WelcomePage, icon: 'person-add' }
  ];

  constructor(private translate: TranslateService, private platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private events: Events, private menu: MenuController, private sessionData: SessionData, private googlePlus: GooglePlus) {
    this.initTranslate();

    this.listenToLoginEvents();

    this.sessionData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true)
      if(hasLoggedIn === true){    
        this.nav.setRoot(TabsPage);
        this.getUser();
      }
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      //this.sessionData.logout();
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      this.getUser();
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
      this.getUser();
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  getUser() {
     return this.sessionData.getUser().then((user) => {
      this.user = user;
      return;
    });
  }

  logout() {
    this.sessionData.logout();
    this.googlePlus.logout();
    this.nav.setRoot(WelcomePage);
  }

  changeUser(){    
    this.sessionData.logout();
    this.googlePlus.disconnect();
    this.nav.setRoot(WelcomePage);
  }
}
