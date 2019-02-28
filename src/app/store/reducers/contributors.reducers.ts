import { ContributorEntities } from '../../interfaces/contributor-entities.interface';
import * as ContributorsActions from '../actions/contributors.actions';
import { Entities } from '../../tools/entities';
import { Sorting } from '../../tools/sorting';
import { githubConfig } from '../../config/github.config';
import tmpContributors from '../../config/tmpContributors.json';

export interface State {
  contributors: ContributorEntities | {};
  counter: number;
  page: number;
  perPage: number;
  sort: string;
  activeContributor: string;
}

export const initialState: State = {
  contributors: tmpContributors,
  counter: 116,
  page: 1,
  perPage: githubConfig.contributorsPerPage,
  sort: 'contributions',
  activeContributor: '',
};

// export const initialState: State = {
//   contributors: {},
//   counter: 0,
//   page: 1,
//   perPage: githubConfig.contributorsPerPage,
//   sort: 'contributions',
//   activeContributor: '',
// };

export function ContributorsReducer(state = initialState, action: ContributorsActions.ContributorsActions) {
  switch (action.type) {
    case ContributorsActions.SAVE_CONTRIBUTOR:
      if (!state.contributors[action.payload.contributor.login]) {
        return {
          ...state,
          contributors: {
            ...state.contributors,
            [action.payload.contributor.login]: {
              ...action.payload.contributor,
              contributions: {
                ...action.payload.contributor.contributions,
              }
            }
          },
          counter: state.counter + 1,
        };
      } else {
        // if already exists, only update contributions
        const newContributions = {
          ...state.contributors[action.payload.contributor.login].contributions,
          ...action.payload.contributor.contributions,
        };
        const newAllContributions = Object.keys(newContributions).map(key => newContributions[key].contributions).reduce((a, b) => a + b);
        return {
          ...state,
          contributors: {
            ...state.contributors,
            [action.payload.contributor.login]: {
              ...state.contributors[action.payload.contributor.login],
              contributions: { ...newContributions },
              allContributions: newAllContributions,
            }
          }
        };
      }

    case ContributorsActions.UPDATE_CONTRIBUTOR:
      return {
        ...state,
        contributors: {
          ...state.contributors,
          [action.payload.contributor.login]: {
            ...state.contributors[action.payload.contributor.login],
            name: action.payload.contributor.name,
            company: action.payload.contributor.company,
            blog: action.payload.contributor.blog,
            location: action.payload.contributor.location,
            publicRepos: action.payload.contributor.publicRepos,
            publicGists: action.payload.contributor.publicGists,
            followers: action.payload.contributor.followers,
            reposUrl: action.payload.contributor.reposUrl,
            loaded: action.payload.contributor.loaded,
          }
        }
      };

    case ContributorsActions.SET_PAGE:
      let newPage = action.payload.page;
      if (newPage > Math.ceil(state.counter / state.perPage)) { newPage = Math.ceil(state.counter / state.perPage); }
      if (newPage < 1) { newPage = 1; }
      return {
        ...state,
        page: newPage,
      };

    case ContributorsActions.SET_SORT:
      return {
        ...state,
        sort: action.payload.sort,
      };

    case ContributorsActions.SET_ACTIVE_CONTRIBUTOR:
      let activeContributor = action.payload.login;
      if (!state.contributors[action.payload.login]) {
        activeContributor = '';
      }
      return {
        ...state,
        activeContributor: action.payload.login,
      };

    default:
      return state;
  }

}

export const getContributors = (state: State) => {
  let sortMethod;
  switch (state.sort) {
    case 'contributions':
      sortMethod = Sorting.sortByContributions;
      break;
    case 'repositories':
      sortMethod = Sorting.sortByRepositories;
      break;
    case 'gists':
      sortMethod = Sorting.sortByGists;
      break;
    case 'followers':
      sortMethod = Sorting.sortByFollowers;
      break;
    default:
      sortMethod = Sorting.sortByContributions;
      break;
  }
  return Object.values(state.contributors)
    .sort(sortMethod)
    .slice((state.page - 1) * state.perPage, state.page * state.perPage);
};
export const getAllContributors = (state: State) => state.contributors;
export const getContributor = (state: State) => state.contributors[state.activeContributor];
export const getContributorsPrevPage = (state: State) => state.page - 1 > 0 ? state.page - 1 : 0;
export const getContributorsNextPage = (state: State) => state.page + 1 <= Math.ceil(state.counter / state.perPage) ? state.page + 1 : 0;
export const getContributorsCounter = (state: State) => state.counter;
export const getContributorsPages = (state: State) => Math.ceil(state.counter / state.perPage);
export const getContributorsSort = (state: State) => state.sort;
