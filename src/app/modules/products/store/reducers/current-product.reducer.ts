import { Action, createReducer, on } from '@ngrx/store';
import {
  closeCurrentProduct,
  openCurrentProduct,
  updateCurrentProductCount,
} from '../actions/current-product.actions';
import { CurrentProductState } from '../states';

const initState: CurrentProductState = {
  data: null,
  loaded: false,
  loading: false,
};

const reducer = createReducer(
  initState,
  on(openCurrentProduct, (state, { product }) => ({
    ...state,
    data: product,
    loaded: true,
  })),

  on(closeCurrentProduct, state => ({
    ...initState,
  })),

  on(updateCurrentProductCount, (state, { inCart }) => ({
    ...state,
    data: {
      ...state.data,
      inCart,
    },
  })),
);

export function currentProductReducer(
  state: CurrentProductState,
  action: Action,
) {
  return reducer(state, action);
}
