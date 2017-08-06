import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Clue } from '../../models/clue';


@Component({
  selector: 'page-location-add-clue',
  templateUrl: 'location-add-clue.html'
})

export class LocationAddCluePage {

  private clue: Clue;
  private clueForm: FormGroup;

  constructor(params: NavParams, public viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.clueForm = this.formBuilder.group({
          message: ['', Validators.compose([Validators.required])]
      });

      this.clue = { message: ''}
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submitClue() {
    if(this.clueForm.valid){
        let form = this.clueForm.value;
        this.clue.message = form.message;

        this.viewCtrl.dismiss(this.clue);
    }
  }
}