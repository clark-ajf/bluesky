import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Printer, PrintOptions } from '@ionic-native/printer';

import { NgxQRCodeModule, NgxQRCodeComponent } from 'ngx-qrcode2';


@Component({
  selector: 'page-location-qrcode',
  templateUrl: 'location-qrcode.html'
})

export class LocationQRCodePage {
  @ViewChild('qrcodeImage')
  private qrcodeImage: NgxQRCodeComponent;
  private qrcode: string;
  private imageData: string;

  constructor(navParams: NavParams, public viewCtrl: ViewController, private printer: Printer, private base64ToGallery: Base64ToGallery) {
    this.qrcode = <string> navParams.get('qrcode');
  }

  ionViewDidLoad() {
    this.qrcodeImage.toDataURL().then((imgData) => {
        this.imageData = <string> imgData;
    }, (error)=>{
        console.log(error);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  saveImage(){
    this.base64ToGallery.base64ToGallery(this.imageData, { prefix: 'bluesky_' }).then(
        res => console.log('Saved image to gallery ', res),
        err => console.log('Error saving image to gallery ', err)
    );
  }

  print(){
      this.printer.check().then((data) => {
          console.log(data);
          if(data){
            this.printer.pick().then((uri) => {
                let options: PrintOptions = {
                    name: 'QRCode',
                    printerId: uri,
                    duplex: true,
                    landscape: true,
                    grayscale: true
                };
                this.printer.print(this.qrcodeImage.qrcElement.nativeElement, options).then((print) => {
                    console.log(print);
                }, (error) => {
                    console.log(error);
                });
            }, (error) => {
                console.log(error);
            });
          }
      }, (error) => {
          console.log(error);
      });
  }
}