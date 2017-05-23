import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation, Coordinates, Geoposition } from '@ionic-native/geolocation';

import  { Platform } from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { ISubscription } from "rxjs/Subscription";

import { SensorCollector } from '../../providers/sensor-collector'
import { DbFrame } from '../../models/db-frame'
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
export class LocationPage implements OnInit, OnDestroy {
  
  positionSubscription: ISubscription;
  coord: Coordinates;
  debug:string='empty\n';
  isApp:boolean;
  watch:Observable<Geoposition>;
  locationChanges: number = 1;
  dist: number = 0;
  dbRecord :DbFrame;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private geolocation: Geolocation,
              public platform: Platform,
              private sensorCollector: SensorCollector ) {
    if(this.platform.is('core')||this.platform.is('mobileweb')){
      this.isApp = false;
    }
    else{
      this.isApp = true;

      
    }
   
    
  }
  ngOnInit(){
    console.log("init Location")
    
  }
  ngOnDestroy(){
    console.log("destroy Location")
    if(this.positionSubscription)
      this.sensorCollector.terminateGeolocation();
      this.positionSubscription.unsubscribe();
}

  getDecibelMeasure(){
    this.sensorCollector.recordDecibel(10000).then((recordResult)=>{
        this.dbRecord = recordResult;
        this.debug +="\n***\n after 10000=>"+JSON.stringify(recordResult);
      })
  }
  watchLocation(){
    
    if (!this.positionSubscription)
      {
        this.debug+="Starging to watch location:\n"
        this.positionSubscription = this.sensorCollector.getLocation().subscribe(position=>{
        this.coord = position.coords;
      })
      this.sensorCollector.initiateGeolocation();
      }

  }

  stopWatchingLocation(){
    if(this.positionSubscription)
    {
      console.log("StopWatchingLocation")
      this.positionSubscription.unsubscribe();
      this.positionSubscription = null;
      this.sensorCollector.terminateGeolocation();
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Location');
  }
}
