import { CreatedAtField, ModifiedAtField } from './general.model';
import { ProductModel } from './product.model';

export interface OrderProductRequestPayload {
  id: string;
  orderCount: number;
  shippedCount: number;
}

export enum OrderStatus {
  REQUESTED = 'REQUESTED',
  SHIPPED = 'SHIPPED',
  CANCELED = 'CANCELED',
}

export interface OrderRequestPayload extends CreatedAtField, ModifiedAtField {
  id?: string;
  routeId: string;
  products: OrderProductRequestPayload[];
  status: OrderStatus;
}

export interface OrderProduct extends ProductModel {
  orderInfo: OrderRequestPayload;
}

export interface Order extends CreatedAtField, ModifiedAtField {
  id: string;
  routeId: string;
  products: OrderProduct[];
  status: OrderStatus;
}
