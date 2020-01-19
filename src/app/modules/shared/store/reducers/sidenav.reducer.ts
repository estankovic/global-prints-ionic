import { Action, createReducer, on } from '@ngrx/store';
import { closeSidenav, openSidenav } from '../actions/sidenav.actions';
import { SideNavState } from '../states';

const initState: SideNavState = {
  opened: false,
};

const reducer = createReducer(
  initState,
  on(openSidenav, state => ({...state, opened: true})),
  on(closeSidenav, state => ({...state, opened: false})),
);

export function sidenavReducer(state: SideNavState, action: Action) {
  return reducer(state, action);
}
