import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CartProductModel } from '../../../shared/models/product.model';
import { updateCurrentProductCount } from '../../store/actions/current-product.actions';
import {
  $currentProduct,
  $currentProductLoaded,
} from '../../store/selectors/current-product.selectors';
import { ProductModuleState } from '../../store/states';

@Component({
  selector: 'gp-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  currentProductLoaded$ = this.store.pipe(select($currentProductLoaded));
  currentProduct$ = this.store.pipe(select($currentProduct));

  constructor(
    private readonly store: Store<ProductModuleState>,
    private readonly dialogRef: MatDialogRef<ProductDetailComponent>,
  ) {}

  ngOnInit() {}

  countChanged(event: { count: number }) {
    this.store.dispatch(
      updateCurrentProductCount({
        inCart: event.count,
      }),
    );
  }

  addToCart(product: CartProductModel) {
    this.dialogRef.close({ product });
  }

  close() {
    this.dialogRef.close(null);
  }
}
