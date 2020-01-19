import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { delay, filter, map, mergeMap, switchMap, take, tap, withLatestFrom, } from 'rxjs/operators';
import { deleteCartProduct, updateCartProduct, } from '../../../cart/store/actions/cart.actions';
import { $cartItemCount } from '../../../cart/store/selectors/cart.selectors';
import { CartProductModel } from '../../../shared/models/product.model';
import { $activeCategory } from '../../../shared/store/selectors/category.selectors';
import { ProductDetailComponent } from '../../dialogs/product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';
import { closeCurrentProduct, openCurrentProduct, } from '../actions/current-product.actions';
import { loadProducts, loadProductsSuccess } from '../actions/products.actions';
import { ProductModuleState } from '../states';

@Injectable()
export class ProductEffect {
  loadProduct = createEffect(() =>
    this.actions.pipe(
      ofType(loadProducts),
      withLatestFrom(this.store.pipe(select($activeCategory))),
      switchMap(([{latestProductID, reload}, category]) => {
        return this.productService
          .getProducts(
            reload ? null : latestProductID,
            category && category.absolutePath,
          )
          .pipe(
            map(products => {
              return loadProductsSuccess({data: products, reload});
            }),
          );
      }),
    ),
  );

  onNavigationProductModal = createEffect(() =>
    this.actions.pipe(
      ofType(routerNavigatedAction),
      filter(action => action.payload.routerState.url.includes('/products/')),
      map(action => action.payload.routerState.url.split('/').pop()),
      delay(250), // fixes issue with preload inCart count
      switchMap(id => this.productService.getProduct(id)),
      switchMap(product =>
        this.store.pipe(
          select($cartItemCount(product.id)),
          take(1),
          map(count => ({ product, count })),
        ),
      ),
      map(({ product, count }) => {
        return openCurrentProduct({
          product: { ...product, inCart: count },
        });
      }),
    ),
  );

  openProductModal = createEffect(() =>
    this.actions.pipe(
      ofType(openCurrentProduct),
      switchMap(action => {
        const dialogRef = this.dialog.open<
          ProductDetailComponent,
          null,
          { product: CartProductModel | null }
        >(ProductDetailComponent, {
          width: 'calc(100vw - 1rem)',
          maxWidth: '100vw',
        });
        return dialogRef.afterClosed().pipe(
          tap(() => {
            const currentUrlSegments = this.router.url.split('/');
            this.router.navigate([currentUrlSegments[1]]);
          }),
          mergeMap(dialogResult => {
            if (dialogResult) {
              const nextAction = dialogResult.product.inCart
                ? updateCartProduct({ product: dialogResult.product })
                : deleteCartProduct({ product: dialogResult.product });

              return [closeCurrentProduct(), nextAction];
            } else {
              return [closeCurrentProduct()];
            }
          }),
        );
      }),
    ),
  );

  constructor(
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly productService: ProductService,
    private readonly dialog: MatDialog,
    private readonly store: Store<ProductModuleState>,
  ) {}
}
