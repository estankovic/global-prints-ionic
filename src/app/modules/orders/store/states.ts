import { OrderRequestPayload } from '../../shared/models/order.model';
import { StoreStatePaginated } from '../../shared/models/store.models';


export type OrderListState = StoreStatePaginated<OrderRequestPayload>;

export interface OrderModuleState {
  orders: OrderListState;
}
