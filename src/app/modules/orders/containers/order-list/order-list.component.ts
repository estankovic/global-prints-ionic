import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadOrders } from '../../store/actions/order.actions';
import { $orders } from '../../store/selectors/order.selectors';
import { OrderModuleState } from '../../store/states';

@Component({
  selector: 'gp-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders$ = this.store.pipe(select($orders));

  constructor(private readonly store: Store<OrderModuleState>) {
    this.store.dispatch(loadOrders({ latestOrderID: '' }));
  }

  ngOnInit() {}
}
