import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HuntAddLocationsPage } from '../hunt-add-locations/hunt-add-locations';

import { Hunt } from '../../models/hunt';

@Component({
  selector: 'page-hunt-create',
  templateUrl: 'hunt-create.html'
})
export class HuntCreatePage {

  private hunt: Hunt;
  private huntForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private formBuilder: FormBuilder) {
      this.huntForm = this.formBuilder.group({
          name: ['', Validators.compose([Validators.required])],
          short_description: ['', Validators.compose([Validators.required])],
          long_description: ['', Validators.compose([Validators.required])]
      });

      this.hunt = { img: '', message: '', name: '', time: '', locations: []}
  }

  ionViewDidLoad() {
  }

  next(){
    if(this.huntForm.valid && this.hunt.img != ''){
        let form = this.huntForm.value;
        this.hunt.name = form.name;
        this.hunt.message = form.short_description;
        this.navCtrl.push(HuntAddLocationsPage, {hunt: this.hunt});
    }
  }

  deleteImage(){
    this.hunt.img = '';
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
        this.hunt.img = base64Image;
    }, (err) => {
        // Handle error
    });
  }
}
