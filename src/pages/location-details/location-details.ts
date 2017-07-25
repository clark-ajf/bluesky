import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from 'ionic-angular';

import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { Location } from '../../models/location';

@Component({
  selector: 'page-location-details',
  templateUrl: 'location-details.html'
})
export class LocationDetailsPage {

  location: Location;
  options :BarcodeScannerOptions;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public toastCtrl: ToastController) {
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
        }, (err) => {
            console.log("Error occured : " + err);
            const toast = this.toastCtrl.create({
                message: 'Invalid QR code',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
        });   
    }

    showHint(hint){
        const toast = this.toastCtrl.create({
            message: hint.message,
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    }
}
