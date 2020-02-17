import { createFeatureSelector } from '@ngrx/store';
import { OrderModuleState } from '../states';

export const orderFeatureSelector = createFeatureSelector<OrderModuleState>(
  'orders',
);
