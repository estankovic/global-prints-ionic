import { firestore } from 'firebase';

export interface CreatedAtField {
  createAt: Date | firestore.Timestamp | string;
}

export interface ModifiedAtField {
  modifiedAt: Date | firestore.Timestamp | string;
}
