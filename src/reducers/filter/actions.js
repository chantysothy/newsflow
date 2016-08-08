import * as types from './actionTypes';

export function setSelection(sourceId, value) {
  return {type: types.SET_SELECTION, sourceId: sourceId, value: value};
}
