import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { LocationListPage } from '../location-list/location-list';

import { Hunt } from '../../models/hunt';

@Component({
  selector: 'page-hunt-create',
  templateUrl: 'hunt-create.html'
})
export class HuntCreatePage {

  hunt: Hunt;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
  }

  ionViewDidLoad() {
  }

  next(){
    //this.navCtrl.push(LocationListPage);
  }

  selectPicture(){
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
        // Handle error
        });
    }
}
