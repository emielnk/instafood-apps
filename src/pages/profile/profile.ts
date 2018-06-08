import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";

import { AuthData } from "../../providers/auth-data/auth-data";

import { HomePage } from "../home/home";
import { ResepPage } from "../resep/resep";
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public users: any;
  public resepinuser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData) {
    this.authData.getProfileCurerntUser().then(profileSnap => {
      this.users = profileSnap;
    });
    this.authData.getResepCurrentUser().then(resepsnap => {
      this.resepinuser = resepsnap;
    })
  }

  goMakePost() {
    this.navCtrl.push(ResepPage);
  }
  goHome() {
    this.navCtrl.push(HomePage);
  }
}
