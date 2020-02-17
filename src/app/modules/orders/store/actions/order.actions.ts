import { createAction, props } from '@ngrx/store';
import { OrderRequestPayload } from '../../../shared/models/order.model';

export const loadOrders = createAction(
  '[Orders] - Load Orders',
  props<{ latestOrderID: string; reload?: boolean }>(),
);

export const loadOrdersSuccess = createAction(
  '[Orders] - Load Orders Success',
  props<{ data: OrderRequestPayload[]; reload?: boolean }>(),
);

export const loadOrdersFail = createAction(
  '[Orders] - Load Orders Fail',
  props<{ err: any }>(),
);
