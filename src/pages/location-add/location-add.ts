import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import CryptoJS from 'crypto-js';

import { LocationAddCluePage } from '../location-add-hint/location-add-clue';
import { LocationQRCodePage } from '../location-qrcode/location-qrcode';

import { Location } from '../../models/location';


@Component({
  selector: 'page-location-add',
  templateUrl: 'location-add.html'
})

export class LocationAddPage {

  private location: Location;
  private locationForm: FormGroup;

  constructor(navParams: NavParams, public viewCtrl: ViewController, private camera: Camera, private formBuilder: FormBuilder, private toastCtrl: ToastController, private modal: ModalController) {
      this.location = { _id: '', description: '', clues: [], name: '', imageUrl: '', qrToken: CryptoJS.HmacSHA256(Date.now(), Date.now().toString()).toString(CryptoJS.enc.Base64), status: ''}
      
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

        if(this.location._id == ''){
          delete this.location._id;
        }
        this.viewCtrl.dismiss(this.location);
    }
  }

  showClue(clue){
      const toast = this.toastCtrl.create({
          message: clue.message,
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 3000
      });
      toast.present();
  }

  addClue(){
    let modal = this.modal.create(LocationAddCluePage);
    modal.onDidDismiss(data => {
      if(data){
        this.location.clues.push(data);
      }
    });
    modal.present();
  }

  showQRCode(){
    let modal = this.modal.create(LocationQRCodePage, {qrcode: this.location.qrToken});
    modal.present();
  }

  selectPicture(takePicture: boolean){
    const options: CameraOptions = {
        quality: 60,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: takePicture? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        targetHeight: 200,
        targetWidth: 350,
        correctOrientation: true
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