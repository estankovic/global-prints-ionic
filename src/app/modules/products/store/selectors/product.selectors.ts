import { createSelector } from '@ngrx/store';
import { productAdapter } from '../reducers/products.reducer';
import { productFeatureSelector } from './feature.selector';

const $productState = createSelector(
  productFeatureSelector,
  state => state.products,
);

const { selectAll } = productAdapter.getSelectors();

const $productData = createSelector(
  $productState,
  state => state.data,
);

export const $productList = createSelector(
  $productData,
  state => selectAll(state),
);

export const $productListLoading = createSelector(
  $productState,
  state => state.loading,
);

export const $lastProduct = createSelector(
  $productList,
  state => (state[0] ? state[state.length - 1] : null),
);

export const $productListLoaded = createSelector(
  $productState,
  state => state.loaded,
);
