import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  selected: {
    'bbcnews': false,
    'bloomberg': true,
  },
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_SELECTION:
      let selected = state.selected.merge({
        [action.sourceId]: action.value
      });
      return state.merge({
        selected: selected
      });

    default:
      return state;
  }
}
