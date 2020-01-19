import { createFeatureSelector } from '@ngrx/store';
import { SharedState } from '../states';

export const sharedFeatureSelector = createFeatureSelector<SharedState>(
  'shared',
);
