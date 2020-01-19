import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule, MatRippleModule } from '@angular/material';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductDetailComponent } from './dialogs/product-detail/product-detail.component';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductService } from './services/product.service';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects),
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    MatRippleModule,
    IonicModule,
  ],
  entryComponents: [
    ProductDetailComponent
  ],
  exports: [
    ProductDetailComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule {}
