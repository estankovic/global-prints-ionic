import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './containers/scanner/scanner.component';


@NgModule({
  declarations: [ScannerComponent],
  imports: [
    CommonModule,
    ScannerRoutingModule,
    SharedModule
  ]
})
export class ScannerModule { }
