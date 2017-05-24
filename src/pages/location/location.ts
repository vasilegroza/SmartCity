import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation, Coordinates, Geoposition } from '@ionic-native/geolocation';

import { Platform } from 'ionic-angular'
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
  positionSubscription1: ISubscription;

  coord: Coordinates;
  coord1: Coordinates;
  debug: string = 'empty\n';
  isApp: boolean;
  watch: Observable<Geoposition>;
  locationChanges: number = 1;
  dist: number = 0;
  dbRecord: DbFrame;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public platform: Platform,
    private sensorCollector: SensorCollector) {
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    }
    else {
      this.isApp = true;


    }
  }
  ngOnInit() {
    console.log("init Location Page")
  }
  ngOnDestroy() {
    console.log("destroy Location")
    if (this.positionSubscription || this.positionSubscription1)
      if (this.positionSubscription)
        this.positionSubscription.unsubscribe();

    if (this.positionSubscription1)
      this.positionSubscription1.unsubscribe();
  }

  getDecibelMeasure() {
    this.sensorCollector.recordDecibel(10000).then((recordResult) => {
      this.dbRecord = recordResult;
      this.debug += "\n***\n after 10000=>" + JSON.stringify(recordResult);
    })
  }
  watchLocation() {

    if (!this.positionSubscription) {
      this.debug += "Starging to watch location:\n"
      this.positionSubscription = this.sensorCollector.getLocation().subscribe(position => {
        this.coord = position.coords;
      })
    }

  }

  stopWatchingLocation() {
    if (this.positionSubscription) {
      console.log("StopWatchingLocation")
      this.positionSubscription.unsubscribe();
      this.positionSubscription = null;
    }
  }
  watchLocation1() {

    if (!this.positionSubscription1) {
      this.debug += "Starging to watch location1:\n"
      this.positionSubscription1 = this.sensorCollector.getLocation().subscribe(position => {
        this.coord1 = position.coords;
      })
      //this.sensorCollector.initiateGeolocation();
    }

  }

  stopWatchingLocation1() {
    if (this.positionSubscription1) {
      console.log("StopWatchingLocation1")
      this.positionSubscription1.unsubscribe();
      this.positionSubscription1 = null;
      // this.sensorCollector.terminateGeolocation();
      // contor se service users ++ --
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Location');
  }
}
