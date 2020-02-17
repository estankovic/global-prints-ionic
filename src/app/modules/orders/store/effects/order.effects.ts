import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { loadOrders, loadOrdersSuccess } from '../actions/order.actions';
import { OrderModuleState } from '../states';

@Injectable()
export class OrderEffect {
  getOrders = createEffect(() =>
    this.actions.pipe(
      ofType(loadOrders),
      switchMap(action =>
        this.orderService.getOrders().pipe(
          map(orders => {
            return loadOrdersSuccess({ data: orders });
          }),
        ),
      ),
    ),
  );

  constructor(
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly orderService: OrderService,
    private readonly store: Store<OrderModuleState>,
  ) {}
}
