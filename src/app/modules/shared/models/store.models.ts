import { EntityState } from '@ngrx/entity';

export interface StoreState<T, M = undefined>
  extends BasicStateProps<EntityState<T>, M> {}

export interface StoreStateSingle<T, M = undefined>
  extends BasicStateProps<T, M> {}

export interface StoreStatePaginated<T, M = undefined>
  extends BasicStateProps<EntityState<T>, M> {
  pagination: {
    latestId: string;
  };
}

export interface BasicStateProps<T, M> {
  loading?: boolean;
  loaded?: boolean;
  metadata?: M;
  data: T;
}
