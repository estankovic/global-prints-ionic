import { createAction, props } from '@ngrx/store';
import { ProductModel, } from '../../../shared/models/product.model';

export const loadProducts = createAction(
  '[Products] - Load',
  props<{ latestProductID: string; reload?: boolean }>(),
);

export const loadProductsSuccess = createAction(
  '[Products] - Load Success',
  props<{ data: ProductModel[]; reload?: boolean }>(),
);

export const loadProductsFail = createAction(
  '[Products] - Load Fail',
  props<{ err: any }>(),
);
