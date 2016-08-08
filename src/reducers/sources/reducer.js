import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

import { Sources } from '../../config/Sources';

let initialSelected = {};
Sources.map((source) => { 
  initialSelected[source.id] = true;
});

const initialState = Immutable({
  selected: initialSelected,
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.STORE_SELECTION:
      return state.merge({
        selected: action.selected
      });

    default:
      return state;
  }
}
