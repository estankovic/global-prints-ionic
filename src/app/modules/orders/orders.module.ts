import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { OrderListComponent } from './containers/order-list/order-list.component';
import { effects } from './store/effects';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderService } from './services/order.service';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    StoreModule.forFeature('orders', reducers),
    EffectsModule.forFeature(effects),
    IonicModule,
  ],
  providers: [
    OrderService
  ]
})
export class OrdersModule {}
