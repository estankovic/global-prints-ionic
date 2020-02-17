import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { OrderListComponent } from './containers/order-list/order-list.component';

import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    StoreModule.forFeature('products', {}),
    EffectsModule.forFeature([]),
    IonicModule,
  ],
})
export class OrdersModule {}
