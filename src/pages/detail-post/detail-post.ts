import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeDataProvider } from "../../providers/recipe-data/recipe-data";
import { AuthData } from "../../providers/auth-data/auth-data";
/**
 * Generated class for the DetailPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-post',
  templateUrl: 'detail-post.html',
})
export class DetailPostPage {

  public currentPost: any;
  public id_makers: any;
  public currentMakers: any;
  
  constructor(public recipeData: RecipeDataProvider,  public authData: AuthData, public navCtrl: NavController, public navParams: NavParams) {
   this.recipeData.getResepDetail(this.navParams.get('resepId')).then(eventSnapshot => {
      this.currentPost = eventSnapshot;
      this.id_makers = eventSnapshot.userId;
        this.authData.getProfileUser(this.id_makers).then(userSnap => {
          this.currentMakers = userSnap;
        });
    });
  }

  ionViewDidEnter(){
     
  }

}
