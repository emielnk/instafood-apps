import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { RecipeDataProvider } from "../providers/recipe-data/recipe-data";
import { AuthData } from "../providers/auth-data/auth-data";

import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  public users: any;

  constructor(public authData: AuthData, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
       const firebaseConfig = {
        apiKey: "AIzaSyBw6z4fGon06tzfrcAuIlPNqsK6aPtWK5s",
        authDomain: "instafood-7a248.firebaseapp.com",
        databaseURL: "https://instafood-7a248.firebaseio.com",
        projectId: "instafood-7a248",
        storageBucket: "instafood-7a248.appspot.com",
        messagingSenderId: "24621035440"
      };
      firebase.initializeApp(firebaseConfig) 
      firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
              console.log("not login");
              this.rootPage = Login;
          } else {
              console.log("login");
              this.rootPage = HomePage;
               this.authData.getProfileCurerntUser().then(profileSnap => {
                this.users = profileSnap;
              });
            }
      });
      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
    });
  }
}
