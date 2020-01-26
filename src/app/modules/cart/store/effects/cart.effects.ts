import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, switchMap } from 'rxjs/operators';
import {
  OrderRequestPayload,
  OrderStatus,
} from '../../../shared/models/order.model';
import { CartProductModel } from '../../../shared/models/product.model';
import { OrderService } from '../../services/order.service';
import { placeOrder, placeOrderSuccess } from '../actions/cart.actions';
import { CartModuleState } from '../states';

@Injectable()
export class CartEffect {
  placeOrder = createEffect(() =>
    this.actions.pipe(
      ofType(placeOrder),
      map(item => item.products),
      map<CartProductModel[], OrderRequestPayload>(products => {
        return {
          routeId: 'route_2020_1',
          status: OrderStatus.REQUESTED,
          products: products.map(p => ({
            id: p.id,
            orderCount: p.inCart,
            shippedCount: 0,
          })),
        };
      }),
      switchMap(order =>
        fromPromise(this.orderService.create(order)).pipe(
          map(_ => placeOrderSuccess({ order })),
        ),
      ),
    ),
  );

  constructor(
    private readonly orderService: OrderService,
    private readonly actions: Actions,
    private readonly store: Store<CartModuleState>,
  ) {}
}
