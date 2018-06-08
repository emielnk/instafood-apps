import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { ResetPassword }from '../pages/reset-password/reset-password';
import { Signup } from '../pages/signup/signup';
import { ResepPage } from "../pages/resep/resep";
import { ProfilePage } from "../pages/profile/profile";
import { DetailPostPage } from "../pages/detail-post/detail-post";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { ProfileUserPage } from "../pages/profile-user/profile-user";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Camera } from "@ionic-native/camera";

import firebase from 'firebase';

import { AuthData } from '../providers/auth-data/auth-data';
import { RecipeDataProvider } from '../providers/recipe-data/recipe-data';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
      Login,
      ResetPassword,
      Signup,
      ResepPage,
      ProfilePage,
      DetailPostPage,
      EditProfilePage,
      ProfileUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //AngularFireModule.initializeApp(config),
    //AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
      Login,
      ResetPassword,
      Signup,
      ResepPage,
      ProfilePage,
      DetailPostPage,
      EditProfilePage,
      ProfileUserPage
  ],
  providers: [
    AuthData,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecipeDataProvider,
    AngularFireDatabase,
    AngularFireAuth,
    FirebaseApp,
    Camera
  ]
})
export class AppModule {}
