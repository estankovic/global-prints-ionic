import { Component, Input, OnInit } from '@angular/core';
import { OrderRequestPayload, OrderStatus } from '../../models/order.model';

@Component({
  selector: 'gp-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order: OrderRequestPayload = {
    id: 'abcd',
    routeId: 'route_2020_01',
    status: OrderStatus.REQUESTED,
    products: [],
    createAt: (new Date()).toLocaleString(),
    modifiedAt: (new Date()).toLocaleString(),
  };

  constructor() {}

  ngOnInit() {}
}
