import { createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ProductModel } from '../../../shared/models/product.model';
import { loadProducts, loadProductsSuccess } from '../actions/products.actions';
import { ProductState } from '../states';

export const productAdapter = createEntityAdapter<ProductModel>();

const initState: ProductState = {
  data: productAdapter.getInitialState(),
  metadata: null,
  loaded: false,
  loading: false,
  pagination: {
    latestId: null,
  },
};

const reducer = createReducer(
  initState,

  on(loadProducts, (state, { latestProductID }) => ({
    ...state,
    loading: true,
  })),

  on(loadProductsSuccess, (state, {data, reload}) => ({
    ...state,
    data: reload
      ? productAdapter.addAll(data, state.data)
      : productAdapter.addMany(data, state.data),
    loading: false,
    loaded: true,
  })),
);

export function productsReducer(state: ProductState, action: Action) {
  return reducer(state, action);
}
