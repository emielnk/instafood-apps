import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPostPage } from './detail-post';

@NgModule({
  declarations: [
    DetailPostPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPostPage),
  ],
  exports: [
    DetailPostPage
  ]
})
export class DetailPostPageModule {}
