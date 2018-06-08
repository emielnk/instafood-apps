import { Injectable } from '@angular/core';
import firebase from 'firebase/app';


@Injectable()
export class AuthData {

  //private userLogged = firebase.auth().currentUser.uid;
  
  public userLogged: firebase.database.Reference;
  public user: any;
  public id_user: any;
  public userProf: any;
  public userresep: firebase.database.Reference;

  constructor() {
    //this.userresep = firebase.database().ref('userProfile/'+ firebase.auth().currentUser.uid+'/resep/')
  }

  loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

 
  signupUser(email: string, password: string, username: string)/*: firebase.Promise<any>*/ {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
        firebase.database().ref('/userProfile').child(newUser.uid).set({
             username: username,
             email: email,
             id_user: newUser.uid,
             password: password,
             user_rate: 0,
             usercaption: ''
      });
    });
  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  
  logoutUser(): firebase.Promise<any> {
    return firebase.auth().signOut();
  }

  getProfileCurerntUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
       firebase.database().ref('/userProfile/'+firebase.auth().currentUser.uid+'/').on("value", snapshot => {
         this.userLogged = snapshot.val();
       });
       resolve(this.userLogged);
    });
  }

  getResepCurrentUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
       firebase.database().ref('userProfile/'+ firebase.auth().currentUser.uid+'/resep').on("value", snapshot => {
         let raw = [];
         snapshot.forEach(snap => {
           raw.push({
            namaresep: snap.val().namaresep
           });
           return false
         });
         resolve(raw);
       });
    });
  }

  getProfileUser(userId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
       firebase.database().ref('/userProfile/'+ userId +'/').on("value", snapshot => {
         this.user = snapshot.val();
         this.id_user = snapshot.key;
       });
       resolve(this.user);
    });
  }

}