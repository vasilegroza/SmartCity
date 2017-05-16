import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Event } from '../../models/event'
import { EventDetails } from '../event-details/event-details'
/**
 * Generated class for the ToDo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-to-do',
  templateUrl: 'to-do.html',
})
export class ToDo {
  icons: string[]
  events: Array<Event>
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
        'american-football', 'boat', 'bluetooth', 'build'];
    this.events =[]
    for(let i =1; i<11; i++){
      this.events.push(
        new Event('Event'+i,
                  'This is event #'+i,
                  this.icons[Math.floor(Math.random() * this.icons.length)])
      )
    }
}
  eventTapped(e, event){
    this.navCtrl.push(EventDetails,{
      event:event
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ToDo');
  }

}
