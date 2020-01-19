import { CartProductModel, ProductModel } from '../../shared/models/product.model';
import { StoreState, StoreStatePaginated } from '../../shared/models/store.models';

export type CartState = StoreState<CartProductModel>;

export interface CartModuleState {
  cart: CartState;
}
