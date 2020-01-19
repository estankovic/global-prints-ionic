import { ActionReducerMap } from '@ngrx/store';
import { ProductModuleState } from '../states';
import { currentProductReducer } from './current-product.reducer';
import { productsReducer } from './products.reducer';

export const reducers: ActionReducerMap<ProductModuleState> = {
  products: productsReducer,
  currentProduct: currentProductReducer,
};
