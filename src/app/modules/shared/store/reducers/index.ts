import { ActionReducerMap } from '@ngrx/store';
import { SharedState } from '../states';
import { categoriesReducer } from './category.reducer';
import { sidenavReducer } from './sidenav.reducer';

export const reducers: ActionReducerMap<SharedState> = {
  sidenav: sidenavReducer,
  categories: categoriesReducer
};
