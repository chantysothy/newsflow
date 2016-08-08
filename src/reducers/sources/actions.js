import * as types from './actionTypes';

/**
 * Set the selection value of a source
 *
 * @param {string} sourceId
 * @param {bool} value
 */
export function setSelection(sourceId, value) {
  return async function(dispatch, getState) {
    const { sources } = getState();
    let selected = sources.selected.merge({
        [sourceId]: value
      });
    dispatch(storeSelection(selected));
  }
}

/**
 * Store the sources selection
 *
 * @param  {object} selected
 *
 * @return {object}
 */
export function storeSelection(selected) {
  return {type: types.STORE_SELECTION, selected: selected}
}
