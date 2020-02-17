import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OrderRequestPayload } from '../../shared/models/order.model';

@Injectable()
export class OrderService {
  constructor(private readonly db: AngularFirestore) {}

  getOrders(): Observable<OrderRequestPayload[]> {
    console.warn('Optimize OrderService.getOrders()');
    return this.db
      .collection<OrderRequestPayload>('orders')
      .valueChanges()
      .pipe(
        // take(1),
        map(orders =>
          orders.map(item => ({
            ...item,
            modifiedAt:
              item.modifiedAt &&
              (item.modifiedAt as firestore.Timestamp).toDate(),
            createAt:
              item.createAt && (item.createAt as firestore.Timestamp).toDate(),
          })),
        ),
      );
  }
}
