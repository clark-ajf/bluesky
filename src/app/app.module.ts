import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { MyHuntsPage } from '../pages/my-hunts/my-hunts';
import { HuntCreatePage } from '../pages/hunt-create/hunt-create';
import { HuntAddLocationsPage } from '../pages/hunt-add-locations/hunt-add-locations';
import { HuntDetailsPage } from '../pages/hunt-details/hunt-details';
import { LocationDetailsPage } from '../pages/location-details/location-details';
import { LocationListPage } from '../pages/location-list/location-list';
import { AccountPage } from '../pages/account/account';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';

import { SessionData } from '../providers/session.data';

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { GooglePlus } from '@ionic-native/google-plus';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    MyHuntsPage,
    HuntCreatePage,
    HuntAddLocationsPage,
    HuntDetailsPage,
    LocationDetailsPage,
    LocationListPage,
    AccountPage,
    SearchPage,
    TabsPage,
    TutorialPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyHuntsPage,
    HuntCreatePage,
    HuntAddLocationsPage,
    HuntDetailsPage,
    LocationDetailsPage,
    LocationListPage,
    AccountPage,
    SearchPage,
    TabsPage,
    TutorialPage,
    WelcomePage
  ],
  providers: [
    Camera,
    GoogleMaps,
    GooglePlus,
    SplashScreen,
    StatusBar,
    BarcodeScanner,
    SessionData,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
