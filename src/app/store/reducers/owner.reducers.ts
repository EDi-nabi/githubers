import { Owner } from '../../models/owner.model';
import * as OwnerActions from '../actions/owner.actions';
// import tmpOwner from '../../config/tmpOwner.json';

export interface State {
  owner: Owner | {};
}

// export const initialState: State = {
//   owner: tmpOwner,
// };

export const initialState: State = {
  owner: {},
};

export function OwnerReducer(state = initialState, action: OwnerActions.OwnerActions) {
  switch (action.type) {
    case OwnerActions.SAVE_OWNER:
      return { ...state, owner: action.payload.owner };

    default:
      return state;
  }
}

export const getOwner = (state: State) => state.owner;
