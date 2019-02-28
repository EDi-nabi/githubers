import { Action } from '@ngrx/store';

export const SET_LOADING              = '[UI] Set loading';
export const SET_LOADED               = '[UI] Set loaded';

export class SetLoading implements Action {
  readonly type: typeof SET_LOADING = SET_LOADING;
  constructor(public payload: { loading: boolean }) { }
}

export class SetLoaded implements Action {
  readonly type: typeof SET_LOADED = SET_LOADED;
  constructor(public payload: { loaded: boolean }) { }
}

export type UiActions = SetLoading | SetLoaded;
