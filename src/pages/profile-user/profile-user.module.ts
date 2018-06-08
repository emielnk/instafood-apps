import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileUserPage } from './profile-user';

@NgModule({
  declarations: [
    ProfileUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileUserPage),
  ],
  exports: [
    ProfileUserPage
  ]
})
export class ProfileUserPageModule {}
