import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ServerEmmiter } from '../../services/server-emmiter/server-emmiter.service'

import { AlertController } from 'ionic-angular';
/**
 * Generated class for the PlaceDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-place-details',
  templateUrl: 'place-details.html',
})
export class PlaceDetailsPage {

public place:any;
public placeDetails:any;
constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.place = this.navParams.get('place');
    this.placeDetails = this.navParams.get('placeDetails');
    console.log('placeDetails', this.place, this.placeDetails)

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceDetailsPage');
  }

}
