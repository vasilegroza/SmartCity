import { Injectable } from '@angular/core';
import { Geolocation, Coordinates, Geoposition } from '@ionic-native/geolocation';

import  { Platform } from 'ionic-angular'
import {Observable, Subject} from 'rxjs/Rx'
import { ISubscription } from "rxjs/Subscription";

import { DBMeter } from '@ionic-native/db-meter'
import { DbFrame } from '../models/db-frame'

/*
  Generated class for the SensorCollector provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SensorCollector {
  
  positionSubscription: ISubscription;
  dbMeterSubscription : ISubscription;

  coordinates: Coordinates;
  isApp:boolean;
  
  watch:Observable<Geoposition>;
  locationChanges: number = 1;
  
  debug :string;
  dist: number = 0;
  dbValue:number;
  dbAverage:number = 0;
  dbValues:number = 0;
  dbIterations:number = 0;
  
  _geoposition = new Subject<Geoposition>();
  constructor(private geolocation: Geolocation,
              public platform: Platform,
              private dbMeter: DBMeter) {
          

    console.log('Hello SensorCollector Provider');

    if(this.platform.is('core')||this.platform.is('mobileweb')){
      this.isApp = false;
    }
    else{
      this.isApp = true;
    }
  }

  recordDecibel(timeout:number):Promise<DbFrame>{
    return new Promise((resolve,reject)=>{
      this.initiateDbMeter();
      setTimeout(()=>{
        resolve(new DbFrame(
                this.dbAverage,
                this.dbIterations,
                this.dbValues,
                this.dbValue))
        this.terminateDbMeter();
      },timeout)
    })
  }
  resetFrame(){
    this.dbAverage=0;
    this.dbIterations = 0;
    this.dbValues = 0;
    this.dbValue = 0;
  }
  
  initiateDbMeter(){
    if(this.isApp)
    {
      this.resetFrame();
      this.dbMeterSubscription = this.dbMeter.start().subscribe((data)=>{
       
        this.dbValue = data;
        this.dbIterations +=1;
        this.dbValues += data;
        this.dbAverage = this.dbValues / this.dbIterations;
       });
    }
  }
  terminateDbMeter(){
    if(this.dbMeterSubscription)
    {   
        console.log('Terminate dbMetter \n');
        this.dbMeterSubscription.unsubscribe();
        this.dbMeter.isListening().then((isListening:boolean)=>{
          console.log("dbMeter isListening"+isListening);  
        });
        this.dbMeter.delete().then(()=>{
          console.log("Deleted dbMeter instance\n");
        }).catch(err=>{
          console.log("Error occured while deleting instance of dbMeter");
        })
    }   
  }
  initiateGeolocation(){
    console.log("INIT LOCATION SEERVICE")
    this.debug +="INIT LOCATION SEERVICE";
    if(this.isApp){
        this.geolocation.getCurrentPosition().then((position) => {
          // resp.coords.latitude
          // resp.coords.longitude
          this.coordinates = position.coords;
        }).catch((error) => {
            console.log('Error getting location', error);
        });

      this.watch = this.geolocation.watchPosition();
      
      this.positionSubscription = this.watch.filter((p)=> p.coords !== undefined).subscribe((position)=>{
          if(position.coords.latitude !== this.coordinates.latitude ||
              position.coords.longitude !== this.coordinates.longitude ||
              position.coords.accuracy < this.coordinates.accuracy)
          {
            // this.debug+=JSON.stringify(position) + '\n';
            this.coordinates = position.coords;
            this.locationChanges +=1;
            console.log(position, this.locationChanges);
            this._geoposition.next(position);
          }
          // }
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
      // this.debug = "initated geolocation for web";
      if (!navigator.geolocation) {
          console.log("Geolocation is not supported in your browser")
        // this.debug ='Geolocation is not supported in your browser';
        return ;
      }
      navigator.geolocation.watchPosition((position)=>{
        if (!this.coordinates){ 
          console.log("asaas",position)
          this.coordinates = position.coords;
          this._geoposition.next(position);
      } 
        if (this.coordinates.latitude != position.coords.latitude ||
            this.coordinates.longitude!= position.coords.longitude){

            this.coordinates = position.coords;
            this.locationChanges += 1;
            this._geoposition.next(position);
            console.log(position, this.locationChanges);
            // this.dist = (this.distance(position.coords, this.coord,'K'));

      }
    },(error)=>{
        switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            // this.debug = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            // this.debug = "The request to get user location timed out."
            break;
    }
      })
    }
  }
  terminateGeolocation(){
    if(this.positionSubscription)
      this.positionSubscription.unsubscribe();
    this.coordinates = null;
  }

  public getLocation():Observable<Geoposition>{
    return this._geoposition.asObservable();
  }


}
