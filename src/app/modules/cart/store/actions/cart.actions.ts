import { createAction, props } from '@ngrx/store';
import { OrderRequestPayload } from '../../../shared/models/order.model';
import { CartProductModel } from '../../../shared/models/product.model';

export const updateCartProduct = createAction(
  '[Cart] - Update Product',
  props<{
    product: CartProductModel;
  }>(),
);

export const deleteCartProduct = createAction(
  '[Cart] - Delete Product',
  props<{
    product: CartProductModel;
  }>(),
);

export const placeOrder = createAction(
  '[Cart] - Place Order',
  props<{
    products: CartProductModel[];
  }>(),
);

export const placeOrderSuccess = createAction(
  '[Cart] - Place Order Success',
  props<{
    order: OrderRequestPayload;
  }>(),
);
