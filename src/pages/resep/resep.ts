import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";

import { RecipeDataProvider } from "../../providers/recipe-data/recipe-data";
import { Camera, CameraOptions } from "@ionic-native/camera";

import { HomePage } from "../home/home";
import { ProfilePage } from "../profile/profile";
import firebase from 'firebase';
/**
 * Generated class for the ResepPage page.
 *
 * See myForm://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-resep',
  templateUrl: 'resep.html',
})
export class ResepPage {
  public myForm;
  loading: any;
  public resepImage: any;
  public resepImageRef: any;
  public resepImageUrl: any;
  
  constructor(public fb: FormBuilder, 
              public nav: NavController,  
              public loadingCtrl: LoadingController, 
              public recipeData: RecipeDataProvider, 
              public alertCtrl: AlertController,
              public cameraPlugin: Camera) { 

        this.myForm = fb.group({
            namaResep: ['', Validators.compose([Validators.required])],
            bahan: ['', Validators.compose([Validators.required])],
            alat: ['', Validators.compose([Validators.required])],
            langkah: ['', Validators.compose([Validators.required])]
        })
    }

  takePicture(){
        this.cameraPlugin.getPicture({
            quality : 95,
            destinationType : this.cameraPlugin.DestinationType.DATA_URL,
            sourceType : this.cameraPlugin.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.cameraPlugin.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
        }).then(imageData => {
            this.resepImage = imageData;
        }, error => {
            console.log("ERROR OIII -> " + JSON.stringify(error));
        });
    }

    /*private uploadPhoto(): void {
        this.resepImageRef.child(this.generateUUID()).child('resep.png')
        .putString(this.resepImage, 'base64', { contentType: 'image/png' })
        .then((savedPicture) => {
            this.resepImageUrl = savedPicture.downloadURL;
        });
    }

    private generateUUID(): any {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }*/
 
  makePost() {
     if (!this.myForm.valid) {
            console.log(this.myForm.value);
        } else {
            /**/
            
            this.recipeData.makePost(
                this.recipeData.id_pembuat, 
                this.myForm.value.namaResep, 
                this.myForm.value.bahan, 
                this.myForm.value.alat, 
                this.myForm.value.langkah, 
                this.recipeData.date_upload)
                .then(() => {
                    this.loading.dismiss().then(() => {
                        this.nav.push(HomePage);
                    });
                }, (error) => {
                    this.loading.dismiss().then(() => {
                        let alert = this.alertCtrl.create({
                            message: error.message,
                            buttons: [
                                {
                                    text: "Ok",
                                    role: 'cancel'
                                }
                            ]
                        });
                        alert.present();
                    });
                });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
            
        }

  }

}
