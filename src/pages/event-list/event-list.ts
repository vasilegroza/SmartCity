import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerEmmiter } from '../../services/server-emmiter/server-emmiter.service'
import { EventDetails } from '../event-details/event-details'
import { AuthService } from '../../services/auth/auth.service'

/**
 * Generated class for the EventListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  events: Array<Object>
  category: string = 'gear';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceEmmiter: ServerEmmiter,
    public authService: AuthService) {
    this.loadEvents();
    // console.log(">>>>>>>>",this.authService.user);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }

  loadEvents() {
    let timeNow = new Date();
    let timeEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    console.log(timeNow.toISOString())
    console.log(timeEnd.toISOString())
    
    this.serviceEmmiter.loadAllEvents({
      mgrs: this.authService.user.mgrs_currentLocation, 
      startTime: timeNow.toISOString(), 
      endTime: timeEnd.toISOString()
    })
      .subscribe(
      data => {
        this.events = data["events"];
        console.log(data);
        console.log("events loaded")
      },
      error => {
        console.log("error wile loading events");
      })

  }

  eventTapped(e, event) {
    console.log("open event detail page for:", event)
    console.log(this.navCtrl.getActive().name);
    this.navCtrl.push(EventDetails, {
      "event": event,
      "prevPage": this.navCtrl.getActive().name
    });

  }

  remainingHours(startTime): String {
    var start = new Date(startTime);
    var now = new Date(Date.now());

    var hours = Math.trunc((start.getTime() - now.getTime()) / 36e5);
    var days = Math.trunc(hours/24);
    let time = `${days} days & ${hours} hours until start`
    // console.log(hours);
    return time;
  }
  getDate(t: string): String {
    var d = new Date(t)
    return d.toDateString()
  }

}
