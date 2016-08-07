import * as firebase from 'firebase';
import { FirebaseConfig } from '../config/FirebaseConfig'

const firebaseApp = firebase.initializeApp(FirebaseConfig);
const auth = firebaseApp.auth();
const rootRef = firebaseApp.database().ref();

export { auth, rootRef };
