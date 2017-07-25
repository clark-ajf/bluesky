import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { Location } from '../../models/location';

@Component({
  selector: 'page-location-details',
  templateUrl: 'location-details.html'
})
export class LocationDetailsPage {

  location: Location;
  scanData : {};
  options :BarcodeScannerOptions;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
    this.location = <Location> navParams.get('location');
  }

  ionViewDidLoad() {
  }

  scan(){
        this.options = {
            prompt : "Scan QR Code "
        }
        this.barcodeScanner.scan(this.options).then((barcodeData) => {

            console.log(barcodeData);
            this.scanData = barcodeData;
        }, (err) => {
            console.log("Error occured : " + err);
        });   
    }
}
