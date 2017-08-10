import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController, Events } from 'ionic-angular';

import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { LocationService } from '../../providers/location.service';

import { Location } from '../../models/location';
import { User } from '../../models/user';

@Component({
  selector: 'page-location-details',
  templateUrl: 'location-details.html'
})
export class LocationDetailsPage {

  location: Location;
  user: User;
  options :BarcodeScannerOptions;

  constructor(public navCtrl: NavController, public events: Events, public modalCtrl: ModalController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public toastCtrl: ToastController, private locationService: LocationService) {
    this.location = <Location> navParams.get('location');
    this.user = <User> navParams.get('user');
  }

  ionViewDidLoad() {
  }

    scan(){
        if(this.location.status == 'found'){
            return;
        }
        this.options = {
            prompt : "Scan QR Code "
        }
        this.barcodeScanner.scan(this.options).then((barcodeData) => {
            if(barcodeData.text == this.location.qrToken){
                this.locationService.checkIn(this.user._id, this.location._id).subscribe(result => {                    
                    const toast = this.toastCtrl.create({
                        message: 'Congratulation You Found the secret!',
                        showCloseButton: true,
                        closeButtonText: 'Ok',
                        duration: 3000
                    });
                    toast.present();
                    this.location.status = 'found';
                    this.events.publish('location:found');
                    this.navCtrl.pop();
                });
            }else{
                const toast = this.toastCtrl.create({
                    message: 'Ops! That QR Code is not the one you are looking for!',
                    showCloseButton: true,
                    closeButtonText: 'Ok',
                    duration: 3000
                });
                toast.present();
            }
        }, (err) => {
            console.log("Error occured : " + err);
            const toast = this.toastCtrl.create({
                message: 'Invalid QR code',
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 3000
            });
            toast.present();
        });   
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
}
