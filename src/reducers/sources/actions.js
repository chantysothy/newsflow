import * as types from './actionTypes';
import { AsyncStorage } from 'react-native';

/**
 * Set the selection value of a source
 *
 * @param {string} sourceId
 * @param {bool} value
 */
export function setSelection(sourceId, value) {
  return async function(dispatch, getState) {
    const { sources } = getState();
    let newSelected = sources.selected.merge({
        [sourceId]: value
      });

    // store the sources selection to Aysnc Storage and then redux store
    await AsyncStorage.setItem('sourcesSelected', JSON.stringify(newSelected));
    dispatch(storeSelection(newSelected));
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
