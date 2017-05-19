import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth/auth.service'
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
  user:Object
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menu:MenuController,
              public auth:AuthService ) {
    this.menu = menu;
    this.menu.enable(true,"myMenu")
    console.log("constructorHome", this.navParams.get("user"));
    this.user = this.navParams.get("user");
    console.log("HOME_PAGE",this.user);          
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
  }

}
