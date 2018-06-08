import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthData } from "../../providers/auth-data/auth-data";

/**
 * Generated class for the ProfileUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile-user',
  templateUrl: 'profile-user.html',
})
export class ProfileUserPage {

  public userdetail: any;
  constructor(public auth: AuthData, public navCtrl: NavController, public navParams: NavParams) {
    this.auth.getProfileUser(this.navParams.get('userId')).then(userSnapshot => {
      this.userdetail = userSnapshot;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUserPage');
  }

}
