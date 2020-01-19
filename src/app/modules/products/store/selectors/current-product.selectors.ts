import { createSelector } from '@ngrx/store';
import { productFeatureSelector } from './feature.selector';

const $currentProductState = createSelector(
  productFeatureSelector,
  state => state.currentProduct,
);

export const $currentProduct = createSelector(
  $currentProductState,
  state => state.data,
);

export const $currentProductLoaded = createSelector(
  $currentProductState,
  state => state.loaded,
);
