import { createSelector } from '@ngrx/store';
import { orderListAdapter } from '../reducers/order.reducer';
import { orderFeatureSelector } from './feature.selector';

const { selectAll } = orderListAdapter.getSelectors();

const orderState = createSelector(orderFeatureSelector, state => state.orders);

const orderData = createSelector(orderState, state => state.data);

export const $orders = createSelector(orderData, state => selectAll(state));
