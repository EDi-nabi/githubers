import { Action } from '@ngrx/store';
import { Repository } from '../../models/repository.model';
import { Owner } from '../../models/owner.model';

export const LOAD_REPOSITORIES      = '[Repositories] Load repositories';
export const SAVE_REPOSITORIES      = '[Repositories] Save repositories';
export const LOAD_USER_REPOSITORIES = '[Repositories] Load user repositories';
export const SAVE_USER_REPOSITORIES = '[Repositories] Save user repositories';

export class LoadRepositories implements Action {
  readonly type: typeof LOAD_REPOSITORIES = LOAD_REPOSITORIES;
  constructor(public payload: { owner: Owner }) { }
}

export class SaveRepositories implements Action {
  readonly type: typeof SAVE_REPOSITORIES = SAVE_REPOSITORIES;
  constructor(public payload: { repositories: Repository[] }) { }
}

export class LoadUserRepositories implements Action {
  readonly type: typeof LOAD_USER_REPOSITORIES = LOAD_USER_REPOSITORIES;
  constructor(public payload: { login: string }) { }
}

export class SaveUserRepositories implements Action {
  readonly type: typeof SAVE_USER_REPOSITORIES = SAVE_USER_REPOSITORIES;
  constructor(public payload: { repositories: Repository[] }) { }
}

export type RepositoriesActions =
  LoadRepositories
  | SaveRepositories
  | SaveUserRepositories;
