import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromApp from './app.reducers';
import * as fromContributors from './contributors.reducers';
import * as fromOwner from './owner.reducers';
import * as fromRepositories from './repositories.reducers';
import * as fromUi from './ui.reducers';

// selector functions for owner
export const getOwnerState = createFeatureSelector<fromOwner.State>('owner');
export const getOwner = createSelector(getOwnerState, fromOwner.getOwner);

// selector functions for repositories
export const getRepositoriesState = createFeatureSelector<fromRepositories.State>('repositories');
export const getRepositories = createSelector(getRepositoriesState, fromRepositories.getRepositories);
export const getUserRepositories = createSelector(getRepositoriesState, fromRepositories.getUserRepositories);
export const getRepository = createSelector(getRepositoriesState, props => fromRepositories.getRepository);

// selector functions for contributors
export const getContributorsState = createFeatureSelector<fromContributors.State>('contributors');
export const getAllContributors = createSelector(getContributorsState, fromContributors.getAllContributors);
export const getContributors = createSelector(getContributorsState, fromContributors.getContributors);
export const getContributor = createSelector(getContributorsState, fromContributors.getContributor);
export const getContributorsCounter = createSelector(getContributorsState, fromContributors.getContributorsCounter);
export const getContributorsPrevPage = createSelector(getContributorsState, fromContributors.getContributorsPrevPage);
export const getContributorsNextPage = createSelector(getContributorsState, fromContributors.getContributorsNextPage);
export const getContributorsPages = createSelector(getContributorsState, fromContributors.getContributorsPages);
export const getContributorsSort = createSelector(getContributorsState, fromContributors.getContributorsSort);

// selector functions for ui
export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getUiLoading = createSelector(getUiState, fromUi.getLoading);
export const getUiLoaded = createSelector(getUiState, fromUi.getLoaded);
