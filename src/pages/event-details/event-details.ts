import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {SensorCollector} from '../../providers/sensor-collector'
import {ServerEmmiter} from '../../services/server-emmiter/server-emmiter.service'

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the EventDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetails {
  previousPage: any;
  selectedEvent: any;
  locationInfo:any;
  data: Array<{title: string, details: Array<any>, type:string, icon: string, showDetails: boolean}> = [];
  day:any = {1:1}
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public serverEmmiter: ServerEmmiter,
              public sensorCollector:SensorCollector) {

    this.selectedEvent = navParams.get('event')
    this.previousPage  = navParams.get("prevPage");
    this.data.push({
      title:'Event Description',
      details:[this.selectedEvent.description],
      type:"text",
      icon:'remove-circle',
      showDetails:true
    })
    this.loadLocationDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetails');
  }

  addToMyEvents(){
    console.log("add event in toDoList");
    this.serverEmmiter.addEvent(this.selectedEvent).subscribe(
      data=>{
        console.log("data", data);
        this.showAlert("Success","Now event is in your toDoList");
      },
      error =>{

      }
    )
  }
  removeFromMyEvents(){
    console.log("remove event from toDoList");
    this.serverEmmiter.removeEvent(this.selectedEvent).subscribe(
      data=>{
        console.log('data',data);
        this.showAlert("Success","You removed event from your toDoList");
        
      },
      error =>{

      }
    )
  }

  loadLocationDetails(){
    let mgrs = this.selectedEvent.venue.location.mgrs;
    if(!mgrs)
      return;
    
    this.serverEmmiter.getCoordinateInfo(mgrs).subscribe(
      data=>{
        this.locationInfo = data;
        this.processLocationDetails();
        console.log(this.locationInfo,"LOCATION INFO")
        


      },
      error =>{
        this.locationInfo = "Could not load info info about location :(";

      }
    )
    this.serverEmmiter.getWeather(7,this.selectedEvent.venue.location).subscribe(
      data=>{
        console.log("weather response");
        console.log(data);
        data = JSON.parse(data);
        let weatherDetail =[]
        for(var i=0; i<data.list.length; i++){
          let day = data.list[i];
          weatherDetail.push(day);
        }
        this.data.push({
          title:"Weather",
          details:weatherDetail,
          type:"weather",
          icon:'add-circle',
          showDetails:false
        })
      },
      error=>{

      }
    )
  }

  processLocationDetails(){
    if(!this.locationInfo)
      return;
    this.locationInfo["noiseInfo"] = this.sensorCollector.dbValueToNoiseLevel(this.locationInfo.noiseLevelMean)  
    this.data.push({
          title: 'Decible measure',
          details: ['In this location decibel average is:'+ this.locationInfo.noiseLevelMean],
          icon: 'add-circle',
          type:"text",
          showDetails: false
    })
     this.data.push({
          title: 'Noise Level',
          details: [`Level of the sound is: ${this.locationInfo.noiseInfo.sound}. For example ${this.locationInfo.noiseInfo.example}`],
          type:'text',
          icon: 'add-circle',
          showDetails: false
    })
  }

  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'add-circle';
    } else {
        data.showDetails = true;
        data.icon = 'remove-circle';
    }
  }

  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
