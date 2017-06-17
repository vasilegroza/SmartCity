import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceDetailsPage } from './place-details';

@NgModule({
  declarations: [
    PlaceDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceDetailsPage),
  ],
  exports: [
    PlaceDetailsPage
  ]
})
export class PlaceDetailsPageModule {}
