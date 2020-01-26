import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderRequestPayload } from '../../shared/models/order.model';

@Injectable()
export class OrderService {
  constructor(private readonly db: AngularFirestore) {}

  create(order: OrderRequestPayload) {
    const id = this.db.createId();
    order = { ...order, id };

    return this.db
      .collection<OrderRequestPayload>('orders')
      .doc(id)
      .set(order);
  }
}
