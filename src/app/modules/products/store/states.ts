import {
  CartProductModel,
  ProductModel,
} from '../../shared/models/product.model';
import {
  StoreStatePaginated,
  StoreStateSingle,
} from '../../shared/models/store.models';

export type ProductState = StoreStatePaginated<ProductModel>;
export type CurrentProductState = StoreStateSingle<CartProductModel>;

export interface ProductModuleState {
  products: ProductState;
  currentProduct: CurrentProductState;
}
