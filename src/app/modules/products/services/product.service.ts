import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ProductModel } from '../../shared/models/product.model';

@Injectable()
export class ProductService {
  constructor(private readonly db: AngularFirestore) {
  }

  getProducts(
    latestID: string,
    category: string = null,
    pageSize = 8,
  ): Observable<ProductModel[]> {
    if (category) {
      category = category.split('__').join('/');
    }
    if (latestID) {
      return this.db
        .collection<ProductModel>('products')
        .doc(latestID)
        .snapshotChanges()
        .pipe(
          take(1),
          switchMap(doc =>
            this.db
              .collection<ProductModel>('products', ref => {
                if (category) {
                  return ref
                    .where('categories', 'array-contains', category)
                    .limit(pageSize)
                    .orderBy('name')
                    .startAfter(doc.payload);
                } else {
                  return ref
                    .limit(pageSize)
                    .orderBy('name')
                    .startAfter(doc.payload);
                }
              })
              .valueChanges()
              .pipe(take(1)),
          ),
        );
    } else {
      return this.db
        .collection<ProductModel>('products', ref => {
          if (category) {
            return ref
              .where('categories', 'array-contains', category)
              .limit(pageSize)
              .orderBy('name');
          } else {
            return ref.limit(pageSize).orderBy('name');
          }
        })
        .valueChanges()
        .pipe(take(1));
    }
  }

  getProduct(id: string): Observable<ProductModel> {
    return this.db
      .collection<ProductModel>('products')
      .doc<ProductModel>(id)
      .valueChanges()
      .pipe(take(1));
  }
}
