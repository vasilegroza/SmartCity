import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

///
import { Home } from '../pages/home/home'
import { Profile } from '../pages/profile/profile'
import { ToDo } from  '../pages/to-do/to-do'
import { Settings } from '../pages/settings/settings'
import { EventDetails } from '../pages/event-details/event-details'
import { StartUpPage } from '../pages/start-up-page/start-up-page'
import { LocationPage } from '../pages/location/location'
// auth component
import { HttpModule, Http} from '@angular/http'
import { AuthConfig, AuthHttp } from 'angular2-jwt'
import { AuthService } from '../services/auth/auth.service'

import { Storage } from '@ionic/storage'
import { Geolocation } from "@ionic-native/geolocation"

let storage:Storage = new Storage('localstorage');
export function getAuthHttp(http){
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    StartUpPage,
    Home,
    Profile,
    ToDo,
    Settings,
    EventDetails,
    LocationPage

    //HelloIonicPage,
    // ItemDetailsPage,
    // ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartUpPage,
    Home,
    Profile,
    ToDo,
    Settings,
    EventDetails,
    LocationPage
    //HelloIonicPage,
    // ItemDetailsPage,
    // ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    {
      provide: AuthHttp,
      useFactory:getAuthHttp,
      deps: [Http]
    }
  ]
})
export class AppModule {}
