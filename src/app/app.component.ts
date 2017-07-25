import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Platform, Nav, Config, Events, MenuController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyHuntsPage } from '../pages/my-hunts/my-hunts';
import { AccountPage } from '../pages/account/account';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { QRPage } from '../pages/qr/qr';

import { SessionData } from '../providers/session.data';

import { TranslateService } from '@ngx-translate/core';
import { GooglePlus } from '@ionic-native/google-plus';

import { User } from '../models/user';
import { MenuItem } from '../models/menuItem';

@Component({
  templateUrl: 'app.template.html'
})
export class MyApp {
  rootPage = TabsPage;

  @ViewChild(Nav) nav: Nav;
  user: User;

  appPages: MenuItem[] = [
    { title: 'Tutorial', component: TutorialPage, icon: 'bulb' },
    { title: 'QR', component: QRPage, icon: 'qr-scanner' }
  ]

  loggedInPages: MenuItem[] = [
    { title: 'My Hunts', component: MyHuntsPage, icon: 'locate', notifications: 3 },
    { title: 'Search', component: SearchPage, icon: 'search' },
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Logout', component: WelcomePage, icon: 'log-out', logsOut: true }
  ];

  loggedOutPages: MenuItem[] = [
    { title: 'Signup', component: WelcomePage, icon: 'log-in' }
  ];

  constructor(private change: ChangeDetectorRef, private translate: TranslateService, private platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private events: Events, private menu: MenuController, private sessionData: SessionData, private googlePlus: GooglePlus) {
    this.initTranslate();

    this.sessionData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableLoggedInMenu(hasLoggedIn === true)
      if(hasLoggedIn === true){    
        this.getUserData();
        this.nav.setRoot(TabsPage);
      }
    });

    this.listenToLoginEvents();
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.getUserData();
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
      this.events.publish('user:logout');
      this.sessionData.logout();
      this.googlePlus.logout();
      this.user = null;
      this.nav.setRoot(WelcomePage);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.getUserData();
      this.enableLoggedInMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.getUserData();
      this.enableLoggedInMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableLoggedInMenu(false);
    });
  }

  ngAfterViewInit() {
    this.getUserData();
  }

  enableLoggedInMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  getUserData() {
     return this.sessionData.getUser().then((user: User) => {
      this.user = user;
      this.change.detectChanges();
      return;
    });
  }
}
