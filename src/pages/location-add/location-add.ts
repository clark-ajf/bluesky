import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { LocationAddHintPage } from '../location-add-hint/location-add-hint';

import { Location } from '../../models/location';


@Component({
  selector: 'page-location-add',
  templateUrl: 'location-add.html'
})

export class LocationAddPage {

  private location: Location;
  private locationForm: FormGroup;

  constructor(navParams: NavParams, public viewCtrl: ViewController, private camera: Camera, private formBuilder: FormBuilder, private toastCtrl: ToastController, private modal: ModalController) {
      this.location = { description: '', hints: [], name: '', imageUrl: '', qrToken: '', status: ''}

      if(typeof navParams.get('location') !== 'undefined'){
        this.location = <Location> navParams.get('location');
      }

      this.locationForm = this.formBuilder.group({
          name: [this.location.name, Validators.compose([Validators.required])],
          short_description: [this.location.description, Validators.compose([Validators.required])]
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submitLocation() {
    if(this.locationForm.valid && this.location.imageUrl != ''){
        let form = this.locationForm.value;
        this.location.name = form.name;
        this.location.description = form.short_description;

        this.viewCtrl.dismiss(this.location);
    }
  }

  showHint(hint){
      const toast = this.toastCtrl.create({
          message: hint.message,
          showCloseButton: true,
          closeButtonText: 'Ok'
      });
      toast.present();
  }

  addHint(){
    let modal = this.modal.create(LocationAddHintPage);
    modal.onDidDismiss(data => {
      if(data){
        this.location.hints.push(data);
      }
    });
    modal.present();
  }

  selectPicture(takePicture: boolean){
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: takePicture? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        targetHeight: 400,
        targetWidth: 700
    }    

    this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.location.imageUrl = base64Image;
    }, (err) => {
        // Handle error
    });
  }
}