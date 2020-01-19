import { createAction, props } from '@ngrx/store';
import { CartProductModel } from '../../../shared/models/product.model';

export const openCurrentProduct = createAction(
  '[Product] - Open Product',
  props<{
    product: CartProductModel;
  }>(),
);

export const updateCurrentProductCount = createAction(
  '[Product] - Update Product Count',
  props<{
    inCart: number;
  }>(),
);

export const closeCurrentProduct = createAction('[Product] - Close Product');
