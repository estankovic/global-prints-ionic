import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { loadProducts } from '../../../products/store/actions/products.actions';
import { ProductModuleState } from '../../../products/store/states';
import { CategoryService } from '../../services/category.service';
import { getCategories, getCategoriesSuccess, setActiveCategory, } from '../actions/categories.actions';
import { closeSidenav } from '../actions/sidenav.actions';

@Injectable()
export class CategoryEffects {
  getCategories = createEffect(() =>
    this.actions.pipe(
      ofType(getCategories),
      switchMap(item =>
        this.categoryService
          .getCategories()
          .pipe(map(categories => getCategoriesSuccess({categories}))),
      ),
    ),
  );

  loadProductWhenCategoryChanged = createEffect(() =>
    this.actions.pipe(
      ofType(setActiveCategory),
      mergeMap(() => [
        loadProducts({
          latestProductID: null,
          reload: true,
        }),
        closeSidenav(),
      ]),
    ),
  );

  constructor(
    private readonly categoryService: CategoryService,
    private readonly actions: Actions,
    private readonly store: Store<ProductModuleState>,
  ) {
  }
}
