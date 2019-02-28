import { Action } from '@ngrx/store';
import { Repository } from '../../models/repository.model';
import { Contributor } from '../../models/contributor.model';

export const LOAD_CONTRIBUTORS         = '[Contributors] Load contributors';
export const SAVE_CONTRIBUTOR          = '[Contributors] Save contributor';
export const LOAD_CONTRIBUTORS_DETAILS = '[Contributors] Load contributors details';
export const LOAD_CONTRIBUTOR_DETAILS  = '[Contributors] Load contributor details';
export const UPDATE_CONTRIBUTOR        = '[Contributors] Update contributor';
export const PREVENT_INFINITE_LOOP     = '[Contributors] Prevent effects infinite loop';
export const SET_PAGE                  = '[Contributors] Set page';
export const SET_SORT                  = '[Contributors] Set sort';
export const SET_ACTIVE_CONTRIBUTOR    = '[Contributors] Set active contributor';

export class LoadContributors implements Action {
  readonly type: typeof LOAD_CONTRIBUTORS = LOAD_CONTRIBUTORS;
  constructor(public payload: { repository: Repository }) { }
}

export class SaveContributor implements Action {
  readonly type: typeof SAVE_CONTRIBUTOR = SAVE_CONTRIBUTOR;
  constructor(public payload: { contributor: Contributor }) { }
}

export class LoadContributorsDetails implements Action {
  readonly type: typeof LOAD_CONTRIBUTORS_DETAILS = LOAD_CONTRIBUTORS_DETAILS;
  constructor(public payload: { contributors: Contributor[] }) { }
}

export class LoadContributorDetails implements Action {
  readonly type: typeof LOAD_CONTRIBUTOR_DETAILS = LOAD_CONTRIBUTOR_DETAILS;
  constructor(public payload: { contributor: Contributor }) { }
}

export class UpdateContributor implements Action {
  readonly type: typeof UPDATE_CONTRIBUTOR = UPDATE_CONTRIBUTOR;
  constructor(public payload: { contributor: Contributor }) { }
}

export class PreventInfiniteLoop implements Action {
  readonly type: typeof PREVENT_INFINITE_LOOP = PREVENT_INFINITE_LOOP;
}

export class SetPage implements Action {
  readonly type: typeof SET_PAGE = SET_PAGE;
  constructor(public payload: { page: number }) { }
}

export class SetSort implements Action {
  readonly type: typeof SET_SORT = SET_SORT;
  constructor(public payload: { sort: string }) { }
}

export class SetActiveContributor implements Action {
  readonly type: typeof SET_ACTIVE_CONTRIBUTOR = SET_ACTIVE_CONTRIBUTOR;
  constructor(public payload: { login: string }) { }
}

export type ContributorsActions =
  LoadContributors
  | SaveContributor
  | LoadContributorsDetails
  | LoadContributorDetails
  | UpdateContributor
  | PreventInfiniteLoop
  | SetPage
  | SetSort
  | SetActiveContributor;
