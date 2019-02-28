import { Action } from '@ngrx/store';
import { Owner } from '../../models/owner.model';

export const LOAD_OWNER  = '[Owner] Load owner';
export const SAVE_OWNER   = '[Owner] Save owner';

export class LoadOwner implements Action {
  readonly type: typeof LOAD_OWNER = LOAD_OWNER;
  constructor(public payload: { login: string }) { }
}

export class SaveOwner implements Action {
  readonly type: typeof SAVE_OWNER = SAVE_OWNER;
  constructor(public payload: { owner: Owner }) { }
}

export type OwnerActions = LoadOwner | SaveOwner;
