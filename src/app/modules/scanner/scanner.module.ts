import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './containers/scanner/scanner.component';


@NgModule({
  declarations: [ScannerComponent],
  imports: [
    CommonModule,
    ScannerRoutingModule,
    SharedModule,
    IonicModule
  ],
  providers: [
    QRScanner
  ]
})
export class ScannerModule { }
