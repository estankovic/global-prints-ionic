import { Action, ActionReducer } from '@ngrx/store';

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

export function storageMetaReducer<S, A extends Action = Action>(
  reducer: ActionReducer<S, A>,
) {
  let onInit = true; // after load/refresh…
  const storageKey = 'cart';
  return (state: S, action: A): S => {
    // reduce the nextState.
    const nextState = reducer(state, action);
    // init the application state.
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(storageKey);
      return { ...nextState, ...savedState };
    }
    setSavedState(nextState, storageKey);
    return nextState;
  };
}
