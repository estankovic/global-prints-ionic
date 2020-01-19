import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartProductModel } from '../../../shared/models/product.model';
import { deleteCartProduct, updateCartProduct, } from '../../store/actions/cart.actions';
import { $cartList } from '../../store/selectors/cart.selectors';
import { CartModuleState } from '../../store/states';

@Component({
  selector: 'gp-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartProductModel[]> = this.store.pipe(
    select($cartList),
  );

  constructor(private readonly store: Store<CartModuleState>) {}

  ngOnInit() {}

  onDelete(product: CartProductModel) {
    this.store.dispatch(deleteCartProduct({ product }));
  }

  onCountChange(product: CartProductModel) {
    this.store.dispatch(
      updateCartProduct({
        product,
      }),
    );
  }
}
