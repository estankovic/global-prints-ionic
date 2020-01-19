import { createSelector } from '@ngrx/store';
import { sharedFeatureSelector } from './feature.selector';

const sidenavState = createSelector(
  sharedFeatureSelector,
  state => state.sidenav,
);

export const $sidenavOpened = createSelector(
  sidenavState,
  state => state.opened,
);
