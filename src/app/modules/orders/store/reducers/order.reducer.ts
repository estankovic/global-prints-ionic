import { act } from '@ngrx/effects';
import { createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { OrderRequestPayload } from '../../../shared/models/order.model';
import { loadOrders, loadOrdersSuccess } from '../actions/order.actions';
import { OrderListState } from '../states';

export const orderListAdapter = createEntityAdapter<OrderRequestPayload>();

const initState: OrderListState = {
  data: orderListAdapter.getInitialState(),
  loading: false,
  loaded: false,
  pagination: {
    latestId: null,
  },
};

const reducer = createReducer(
  initState,
  on(loadOrders, (state, { reload, latestOrderID, type }) => ({
    ...state,
    loading: true,
  })),
  on(loadOrdersSuccess, (state, { data, reload }) => {
    return {
      ...state,
      loading: false,
      data: orderListAdapter.upsertMany(data, state.data),
      loaded: true,
    };
  }),
);

export function orderReducer(state: OrderListState, action: Action) {
  return reducer(state, action);
}
