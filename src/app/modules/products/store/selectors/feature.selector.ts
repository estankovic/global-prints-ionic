import { createFeatureSelector } from '@ngrx/store';
import { ProductModuleState } from '../states';

export const productFeatureSelector = createFeatureSelector<ProductModuleState>(
  'products',
);
