import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HuntAddLocationsPage } from '../hunt-add-locations/hunt-add-locations';

import { Hunt } from '../../models/hunt';
import { User } from '../../models/user';

@Component({
  selector: 'page-hunt-create',
  templateUrl: 'hunt-create.html'
})
export class HuntCreatePage {

  private hunt: Hunt;
  private huntForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private formBuilder: FormBuilder) {
    if(typeof navParams.get('hunt') !== 'undefined'){
        this.hunt = <Hunt> navParams.get('hunt');
    }else{        
        this.hunt = { _id: '', imageUrl: '', shortDescription: '', name: '', isDeleted: false, owner: <User> navParams.get('user'), longDescription: '', locations: []}
    }

    this.huntForm = this.formBuilder.group({
        name: [this.hunt.name, Validators.compose([Validators.required])],
        short_description: [this.hunt.shortDescription, Validators.compose([Validators.required])],
        long_description: [this.hunt.longDescription, Validators.compose([Validators.required])]
    });
  }

  next(){
    if(this.huntForm.valid && this.hunt.imageUrl != ''){
        let form = this.huntForm.value;
        this.hunt.name = form.name;
        this.hunt.shortDescription = form.short_description;
        this.hunt.longDescription = form.long_description;
        this.navCtrl.push(HuntAddLocationsPage, {hunt: this.hunt});
    }
  }

  deleteImage(){
    this.hunt.imageUrl = '';
  }

  selectPicture(takePicture: boolean){
    const options: CameraOptions = {
        quality: 40,
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
        this.hunt.imageUrl = base64Image;
    }, (err) => {
        // Handle error
    });
  }
}
