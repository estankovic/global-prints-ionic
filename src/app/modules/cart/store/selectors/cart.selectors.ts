import { createSelector } from '@ngrx/store';
import { cartItemsAdapter } from '../reducers/cart.reducer';
import { cartFeatureSelector } from './feature.selector';

const { selectAll } = cartItemsAdapter.getSelectors();

const $cartState = createSelector(
  cartFeatureSelector,
  state => (state ? state.cart : null),
);

const $cartData = createSelector(
  $cartState,
  state => (state ? state.data : { entities: {}, ids: [] }),
);

export const $cartList = createSelector(
  $cartData,
  state => selectAll(state),
);

export const $cartItem = (id: string) =>
  createSelector(
    $cartData,
    state => state.entities[id] || null,
  );

export const $cartItemCount = (id: string) =>
  createSelector(
    $cartItem(id),
    state => (state ? state.inCart : 0),
  );
