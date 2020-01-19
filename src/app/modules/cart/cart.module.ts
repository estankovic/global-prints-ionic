import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule, } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { storageMetaReducer } from '../shared/store/reducers/cart-local-storage-meta.reducer';

import { CartRoutingModule } from './cart-routing.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartComponent } from './containers/cart/cart.component';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    StoreModule.forFeature('cart', reducers, {
      metaReducers: [storageMetaReducer],
    }),
    EffectsModule.forFeature([]),
  ],
})
export class CartModule {}
