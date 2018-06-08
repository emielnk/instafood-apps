import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";

import firebase from 'firebase';
import 'rxjs/add/operator/map';

/*
  Generated class for the RecipeDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RecipeDataProvider {
  public id_pembuat = firebase.auth().currentUser.uid;
  public id_resep = firebase.database().ref().child('userResep/').push().key;
  public date_upload = new Date().getTime();
  public reseps = firebase.database().ref('/userResep');
  public userresep: any;

  constructor(public http: Http) {}

  makePost(id_pembuat, namaResep, bahan, alat, langkah, upload_time) {
    var postData = {
      userId: id_pembuat,
      namaresep: namaResep,
      bahan: bahan,
      alat: alat,
      langkah: langkah,
      upload_time: upload_time
    }
    
    var newPostKey = this.id_resep;
    var updates = {};
    var updatess = {};
    updatess['/userProfile/' + id_pembuat + '/resep/'+ newPostKey] = postData;
    updates['/userResep/' + newPostKey] = postData;
    /*if(resepImage != null){
      firebase.storage().ref('/resepImage/').child(newPostKey).child('Image Resep.png')
      .putString(resepImage, 'base64', {
        contentType : 'image/png'
      }).then((savedPicture) => {
        firebase.database().ref('userResep/'+newPostKey+'/')
        .set(savedPicture.downloadURL)
      })
    }*/
    return firebase.database().ref().update(updates).then(() =>{
      return firebase.database().ref().update(updatess)
    })
  }


  getResepList(): Promise<any> {
    return new Promise<any> ((resolve, reject) =>{
    this.reseps.on('value',snapshot =>{
        let rawList = [];
        snapshot.forEach(snap => {
          rawList.push({
            id: snap.key,
            namaresep: snap.val().namaresep,
            bahan: snap.val().bahan,
            alat: snap.val().alat,
            langkah: snap.val().langkah,
          });
        return false
      });
      resolve(rawList);
      });
    });
  }
  
  getResepDetail(resepId): Promise<any> {
    //return this.userLogged.child('/resep').child(resepId);
    return new Promise<any>((resolve, reject) => {
       firebase.database().ref('/userResep/'+ resepId +'/').on("value", snapshot => {
         this.userresep = snapshot.val();
       });
       resolve(this.userresep);
    });
  }

}
