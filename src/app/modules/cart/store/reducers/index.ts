import { ActionReducerMap } from '@ngrx/store';
import { CartModuleState } from '../states';
import { cartReducer } from './cart.reducer';

export const reducers: ActionReducerMap<CartModuleState> = {
  cart: cartReducer,
};
