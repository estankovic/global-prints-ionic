import { createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { CartProductModel } from '../../../shared/models/product.model';
import {
  deleteCartProduct,
  placeOrder,
  placeOrderSuccess,
  updateCartProduct,
} from '../actions/cart.actions';
import { CartState } from '../states';

export const cartItemsAdapter = createEntityAdapter<CartProductModel>();

const initState: CartState = {
  data: cartItemsAdapter.getInitialState(),
  loaded: true,
  loading: true,
};

const reducer = createReducer(
  initState,
  on(updateCartProduct, (state, { product }) => ({
    ...state,
    data: cartItemsAdapter.upsertOne(product, state.data),
  })),

  on(deleteCartProduct, (state, { product }) => ({
    ...state,
    data: cartItemsAdapter.removeOne(product.id, state.data),
  })),

  on(placeOrder, (state, { products }) => ({
    ...state,
    loading: true,
  })),

  on(placeOrderSuccess, (state, { order }) => ({
    ...state,
    data: cartItemsAdapter.getInitialState(),
    loading: false,
  })),
);

export function cartReducer(state: CartState, action: Action) {
  return reducer(state, action);
}
