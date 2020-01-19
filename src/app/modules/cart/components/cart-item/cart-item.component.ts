import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProductModel } from '../../../shared/models/product.model';

@Component({
  selector: 'gp-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() product: CartProductModel;

  @Output() delete = new EventEmitter<CartProductModel>();

  @Output() countChange = new EventEmitter<CartProductModel>();

  constructor() {}

  ngOnInit() {}

  onDelete(product: CartProductModel) {
    this.delete.emit(product);
  }

  onCountChange(ev: { count: number }) {
    this.countChange.emit({ ...this.product, inCart: ev.count });
  }
}
