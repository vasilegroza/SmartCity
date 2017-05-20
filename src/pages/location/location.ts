import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation, Coordinates } from '@ionic-native/geolocation';
import  { Platform } from 'ionic-angular'

/**
 * Generated class for the Location page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  coord: Coordinates;
  debug:string='empty';
  isApp:boolean;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private geolocation: Geolocation,
              public platform: Platform) {
    if(this.platform.is('core')||this.platform.is('mobileweb')){
      this.isApp = false;
    }
    else{
      this.isApp = true;
    }
    this.initiateGeolocation();
    
  }
  initiateGeolocation(){
    if(this.isApp){
      this.debug = "initated geolocation for mobile";
      this.initiateGeolocation()
      this.geolocation.getCurrentPosition().then((position) => {
        this.coord = position.coords;
      // resp.coords.latitude
      // resp.coords.longitude
      }).catch((error) => {
        this.debug ='Error getting location'+ error; 
        console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition();
      watch.filter((p)=> p.coords !== undefined).subscribe((position)=>{
          this.coord = position.coords;
          console.log(position)
      },(error)=>{
        switch(error.code){
          case error.PERMISSION_DENIED:
            this.debug = "User denied the request for Geolocation"
            break
          case error.POSITION_UNAVAILABLE:
            this.debug = "Location information is unavailable."
            break
          case error.TIMEOUT:
            this.debug = "The request to get user location timed out."
            break;
        }
      })
    }
    else{
      this.debug = "initated geolocation for web";
      if (!navigator.geolocation) {
        this.debug ='Geolocation is not supported in your browser';
        return ;
      }
      navigator.geolocation.watchPosition((position)=>{
        console.log(position);
        this.coord = position.coords;
      },(error)=>{
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.debug = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            this.debug = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            this.debug = "The request to get user location timed out."
            break;
    }
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Location');
  }

 

}
