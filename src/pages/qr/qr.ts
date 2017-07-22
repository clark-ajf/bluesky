import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
selector: 'qr',
templateUrl: 'qr.html',
})
export class QRPage {
    scanData : {};
    options :BarcodeScannerOptions;

    constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
    }    

    scan(){
        this.options = {
            prompt : "Scan your barcode "
        }
        this.barcodeScanner.scan(this.options).then((barcodeData) => {

            console.log(barcodeData);
            this.scanData = barcodeData;
        }, (err) => {
            console.log("Error occured : " + err);
        });   
    }
}