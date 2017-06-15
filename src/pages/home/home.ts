import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth/auth.service'


import { Platform } from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { ISubscription } from "rxjs/Subscription";

import { Geolocation, Coordinates, Geoposition } from '@ionic-native/geolocation';
import { SensorCollector } from '../../providers/sensor-collector'

import { ServerEmmiter } from "../../services/server-emmiter/server-emmiter.service"
import { CityProvider } from '../../providers/city/city'


/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {
  user: Object
  positionSubscription: ISubscription;
  coord: Coordinates;
  mgrs_currentLocation: String = null;
  mgrs_lastLocation: String = null;
  isApp: boolean;
  watch: Observable<Geoposition>;
  debug: String = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    private geolocation: Geolocation,
    public platform: Platform,
    public sensorCollector: SensorCollector,
    public auth: AuthService,
    public city: CityProvider,
    public serverEmmiter: ServerEmmiter) {
    this.menu = menu;
    this.menu.enable(true, "myMenu")
    // console.log("constructorHome", this.navParams.get("user"));
    this.user = this.navParams.get("user");
    console.log("HOME_PAGE", this.user);


    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    }
    else {
      this.isApp = true;
    }
    
    // this.serverEmmiter.getUserData(this.user["user_id"]).subscribe(
    //   data=>{
    //     console.log("GETTING USER FROM SERVER",data);
    //   },
    //   error=>{

    //   }
    // );
    this.watchLocation();
    this.city.nearbyPlaces('locatia', 500, 'food');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
  }

  watchLocation() {

    if (!this.positionSubscription) {
      this.debug += "Starting to watch location:\n"
      if (!this.isApp) {
        this.measureNoise(this.mgrs_currentLocation);
      } else {
        this.debug+="set interval for measureNoise"
        setInterval(() => {
          this.measureNoise(this.mgrs_currentLocation);
        },60000);
      }
      this.positionSubscription = this.sensorCollector.getLocation().subscribe(position => {
        this.coord = position.coords;
        let location = {
          position: {
            coords: {
              accuracy: position.coords.accuracy,
              altitude: position.coords.altitude,
              altitudeAccuracy: position.coords.altitudeAccuracy,
              heading: position.coords.heading,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              speed: position.coords.speed
            },
            timestamp: position.timestamp
          }
        }
        console.log(JSON.stringify(location))

        this.serverEmmiter.emmitLocation(location)
          .subscribe(
          data => {

            // if (this.mgrs_currentLocation != data.currentLocation) {
            //   //mi-am schimbat locatia si trebuie sa trimit nivelul de zgomot
            //   console.log(`${this.mgrs_currentLocation} != ${data.currentLocation}`,this.mgrs_currentLocation != data.currentLocation);
            //   //this.measureNoise(data.currentLocation)
            // }
            console.log(data);
            this.auth.user["mgrs_currentLocation"] = data.currentLocation;
            this.auth.user["mgrs_lastLocation"] = data.lastLocation;
            this.mgrs_currentLocation = data.currentLocation;
            this.mgrs_lastLocation = data.lastLocation;

          },
          err => {
            console.log(err);
          });

      })
    }

  }

  measureNoise(location) {
    this.debug+=`MEASURE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...\n${location}`
    if(!location)
    { 
      this.debug +="HERE SUKA\n"  
      return;
    }
    this.sensorCollector.recordDecibel(10000).then((recordResult) => {
      this.debug+=`have to send \n`+ JSON.stringify(recordResult);
      let decibelMeasure = {
        "mgrs": location,
        "recordResult": recordResult
      }
      this.serverEmmiter.emmitNoiseLevel(decibelMeasure).subscribe(

        (data) => {

        },
        (err => {

        })
      );
    }).catch((err) => {
      console.log("error on recording")
    });
  }

  stopWatchingLocation() {
    if (this.positionSubscription) {
      console.log("StopWatchingLocation")
      this.positionSubscription.unsubscribe();
      this.positionSubscription = null;
    }
  }

}
