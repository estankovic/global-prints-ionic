import { Component, Input, OnInit } from '@angular/core';
import { OrderRequestPayload, OrderStatus } from '../../models/order.model';

@Component({
  selector: 'gp-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order: OrderRequestPayload;

  constructor() {}

  ngOnInit() {}
}
