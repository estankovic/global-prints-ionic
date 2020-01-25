import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay, filter, switchMap, take } from 'rxjs/operators';
import { ProductModel } from '../../../shared/models/product.model';
import { loadProducts } from '../../store/actions/products.actions';
import {
  $lastProduct,
  $productList,
  $productListLoaded,
  $productListLoading,
} from '../../store/selectors/product.selectors';
import { ProductModuleState } from '../../store/states';

@Component({
  selector: 'gp-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<ProductModel[]> = this.store.pipe(select($productList));

  isLoading$: Observable<boolean> = this.store.pipe(
    select($productListLoading),
    switchMap(isLoading => {
      if (isLoading) {
        return of(true);
      } else {
        return of(false).pipe(delay(500));
      }
    }),
  );

  isLoaded$ = this.store.pipe(select($productListLoaded));

  constructor(
    private readonly store: Store<ProductModuleState>,
    private readonly router: Router,
    private readonly menu: MenuController,
  ) {
    this.store
      .pipe(
        select($productListLoaded),
        take(1),
        filter(loaded => !loaded),
      )
      .subscribe(() =>
        this.store.dispatch(loadProducts({ latestProductID: '' })),
      );
  }

  ngOnInit() {}

  openDialog(id: string) {
    this.router.navigate(['tabs', 'products', id]);
  }

  loadNext() {
    console.log('next');

    this.store
      .pipe(
        select($lastProduct),
        take(1),
      )
      .subscribe(product => {
        this.store.dispatch(loadProducts({ latestProductID: product.id }));
      });
  }

  onCart() {
    this.router.navigate(['cart']);
  }

  async onMenu() {
    if (!(await this.menu.isOpen('product-categories'))) {
      await this.menu.enable(true, 'product-categories');
      await this.menu.open('product-categories');
    }
  }
}
