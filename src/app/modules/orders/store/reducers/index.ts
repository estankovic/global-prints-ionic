import { ActionReducerMap } from '@ngrx/store';
import { OrderModuleState } from '../states';
import { orderReducer } from './order.reducer';

export const reducers: ActionReducerMap<OrderModuleState> = {
  orders: orderReducer,
};
