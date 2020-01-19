import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
  constructor(private readonly db: AngularFirestore) {
  }

  getCategories() {
    return this.db.collection<Category>('categories').valueChanges();
  }
}
