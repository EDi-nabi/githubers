import { Contributor } from '../../models/contributor.model';
import { Repository } from '../../models/repository.model';
import * as UiActions from '../actions/ui.actions';

export interface State {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  loading: false,
  loaded: true,
};

export function UiReducer(state = initialState, action: UiActions.UiActions) {
  switch (action.type) {
      case UiActions.SET_LOADING:
      return { ...state, loading: action.payload.loading };

    case UiActions.SET_LOADED:
      return { ...state, loaded: action.payload.loaded };

    default:
      return state;
  }

}

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
