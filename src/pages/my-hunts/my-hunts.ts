import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


@Component({
  selector: 'page-my-hunts',
  templateUrl: 'my-hunts.html'
})
export class MyHuntsPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }
}
