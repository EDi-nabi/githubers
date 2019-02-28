import {
  ActionReducerMap,
} from '@ngrx/store';

import * as fromContributors from './contributors.reducers';
import * as fromOwner from './owner.reducers';
import * as fromRepositories from './repositories.reducers';
import * as fromUi from './ui.reducers';

export interface State {
  state: AppState;
}

export interface AppState {
  owner: fromOwner.State;
  repositories: fromRepositories.State;
  contributors: fromContributors.State;
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<AppState> = {
  owner: fromOwner.OwnerReducer,
  repositories: fromRepositories.RepositoriesReducer,
  contributors: fromContributors.ContributorsReducer,
  ui: fromUi.UiReducer,
};
