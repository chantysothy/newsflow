import { rootRef, auth } from './firebaseInit';

import Chance from 'chance';
const chance = new Chance();

function checkUsernameAvailability(username) {
  return new Promise((resolve, reject) => {
    rootRef.child('usernameList').child(username).once('value').then((snapshot) => {
      if (snapshot.exists()) {
        // not available
        console.log('username not available');
        resolve(false);
      } else {
        // available
        console.log('username ok');
        resolve(true);
      }
    });
  })
}

function checkUsernameValidity(username) {
  if(username.length > 3 && username.length < 16 && /^[a-zA-Z0-9_]*$/.test(username)){
    return true;
  } else {
    return false;
  }
}

function saveUsername(username) {
  let user = auth.currentUser;

  rootRef.child('usernameList').child(username).set(user.uid);
  rootRef.child('userProfiles').child(user.uid).update({
    username: username,
  });  
}

function generateRandomUsername() {
  let username = chance.first() + '_' + Math.random().toString(36).substr(2, 7);
  return username;
}

export { checkUsernameAvailability, checkUsernameValidity, saveUsername, generateRandomUsername };
