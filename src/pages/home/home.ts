import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data/auth-data';
import { RecipeDataProvider } from '../../providers/recipe-data/recipe-data';

import { Login } from '../login/login';
import { ResepPage } from "../resep/resep";
import { ProfilePage } from "../profile/profile";
import { DetailPostPage } from "../detail-post/detail-post";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public reseps: Array<any>;
    public users: Array<any>;
    constructor(public navCtrl: NavController, public authData: AuthData, public recipe: RecipeDataProvider) {
        this.recipe.getResepList().then(resepsSnap => {
            this.reseps = resepsSnap;
        });
    }


    logOut() {
        this.authData.logoutUser().then(() => {
            this.navCtrl.setRoot(Login);
        });
    }

    goMakePost() {
        this.navCtrl.push(ResepPage);
    }

    goProfile() {
        this.navCtrl.push(ProfilePage);
    }

    goResepDetail(resepId) {
        this.navCtrl.push(DetailPostPage, {'resepId': resepId});
    }

}
