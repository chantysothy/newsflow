import * as types from './actionTypes';
import { auth, rootRef } from '../../lib/firebaseInit';

export function storeUserInfo(userInfo) {
  return {type: types.STORE_USERINFO, userInfo: userInfo};
}

export function clearUserInfo() {
  return {type: types.CLEAR_USERINFO};
}

export function monitorAuthState() {
  return async function(dispatch) {
    auth.onAuthStateChanged((user) => {
      if (user) {
      // signed in
        rootRef.child('userProfiles').child(user.uid).once('value')
        .then((dataSnapshot) => {
          // fetch username
          let uid = user.uid; 
          let username = 'no name'; // shouldn't be no name

          if(dataSnapshot.exists()) {
            username = dataSnapshot.val().username;
          }

          let userInfo = {
            'uid': uid,
            'username': username,
          }

          dispatch(storeUserInfo(userInfo));
        });
      } else {
        // signed out
        dispatch(clearUserInfo());
      }
    });
  }
}