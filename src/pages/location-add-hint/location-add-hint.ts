import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Hint } from '../../models/hint';


@Component({
  selector: 'page-location-add-hint',
  templateUrl: 'location-add-hint.html'
})

export class LocationAddHintPage {

  private hint: Hint;
  private hintForm: FormGroup;

  constructor(params: NavParams, public viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.hintForm = this.formBuilder.group({
          message: ['', Validators.compose([Validators.required])]
      });

      this.hint = { message: ''}
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submitHint() {
    if(this.hintForm.valid){
        let form = this.hintForm.value;
        this.hint.message = form.message;

        this.viewCtrl.dismiss(this.hint);
    }
  }
}