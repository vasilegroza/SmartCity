import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

///
import { Home } from '../pages/home/home'
import { Profile } from '../pages/profile/profile'
import { ToDo } from '../pages/to-do/to-do'
import { Settings } from '../pages/settings/settings'
import { EventDetails } from '../pages/event-details/event-details'
import { StartUpPage } from '../pages/start-up-page/start-up-page'
import { TestPage } from '../pages/test/test'
import { EventListPage } from '../pages/event-list/event-list'
import { PlaceDetailsPage} from '../pages/place-details/place-details'
// auth component
import { HttpModule, Http } from '@angular/http'
import { AuthConfig, AuthHttp } from 'angular2-jwt'
import { AuthService } from '../services/auth/auth.service'
import { ServerEmmiter } from '../services/server-emmiter/server-emmiter.service'


import { Storage } from '@ionic/storage'
import { Geolocation } from "@ionic-native/geolocation"
import { DBMeter } from '@ionic-native/db-meter'
import { SensorCollector } from '../providers/sensor-collector';
import { Toast } from '@ionic-native/toast'

// css
import { ParallaxHeaderDirective } from '../directives/parallax-header/parallax-header';
import { GalleryModal, ZoomableImage } from  'ionic-gallery-modal'

import { CityProvider } from '../providers/city/city';
import { WeatherComponent } from '../components/weather/weather';
import { CityComponent } from '../components/city/city';
import { PlaceListComponent } from '../components/place-list/place-list';
import { PlaceComponent } from '../components/place/place';


let storage: Storage = new Storage('localstorage');
export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{ 'Accept': 'application/json' }],
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
    TestPage,
    EventListPage,
    PlaceDetailsPage,
    ParallaxHeaderDirective,
    WeatherComponent,
    CityComponent,
    //HelloIonicPage,
    // ItemDetailsPage,
    // ListPage
    GalleryModal, 
    ZoomableImage,
    PlaceListComponent,
    PlaceComponent
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
    TestPage,
    EventListPage,
    PlaceDetailsPage,
    GalleryModal,
    //HelloIonicPage,
    // ItemDetailsPage,
    // ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    DBMeter,
    SensorCollector,
    ServerEmmiter,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    CityProvider,
    Toast
  ]
})
export class AppModule { }
