import { createFeatureSelector } from '@ngrx/store';
import { CartModuleState } from '../states';

export const cartFeatureSelector = createFeatureSelector<CartModuleState>(
  'cart',
);
