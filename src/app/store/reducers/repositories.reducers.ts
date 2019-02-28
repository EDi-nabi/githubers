import * as RepositoriesActions from '../actions/repositories.actions';
import { RepositoryEntities } from '../../interfaces/repository-entities.interface';
import { Entities } from '../../tools/entities';
import { githubConfig } from '../../config/github.config';
// import tmpRepos from '../../config/tmpRepos.json';

export interface State {
  repositories: RepositoryEntities | {};
  userRepositories: RepositoryEntities | {};
  urPerPage: number;
  urPage: number;
  urPages: number;
  urNextPage: string;
  urPrevPage: string;
}

// export const initialState: State = {
//   repositories: tmpRepos,
//   userRepositories: {},
//   urPerPage: githubConfig.reposPerPage,
//   urPage: 1,
//   urPages: 0,
//   urNextPage: '',
//   urPrevPage: '',
// };

export const initialState: State = {
  repositories: {},
  userRepositories: {},
  urPerPage: githubConfig.reposPerPage,
  urPage: 1,
  urPages: 0,
  urNextPage: '',
  urPrevPage: '',
};

export function RepositoriesReducer(state = initialState, action: RepositoriesActions.RepositoriesActions) {
  switch (action.type) {
    case RepositoriesActions.SAVE_REPOSITORIES:
      const newRepositories = Entities.getEntities('name', action.payload.repositories);
      return {
        ...state,
        repositories: {
          ...state.repositories,
          ...newRepositories,
        }
      };

    case RepositoriesActions.SAVE_USER_REPOSITORIES:
      const newUserRepositories = Entities.getEntities('name', action.payload.repositories);
      return {
        ...state,
        userRepositories: {
          ...newUserRepositories,
        }
      };

    default:
      return state;
  }
}

export const getRepositories = (state: State) => Object.values(state.repositories);
export const getUserRepositories = (state: State) => Object.values(state.userRepositories);
export const getRepository = (state: State, props: { name: string }) => state.repositories[props.name];
