import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  userInfo: {
    'uid': null,
    'username': null,
  },
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.STORE_USERINFO:
      return state.merge({
        userInfo: action.userInfo
      });
    case types.CLEAR_USERINFO:
      return state.merge({
        userInfo: initialState,
      });
    default:
      return state;
  }
}
