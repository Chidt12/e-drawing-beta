import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'

import "firebase/firestore";
import { firebaseReducer, reactReduxFirebase, getFirebase } from "react-redux-firebase";
import {
  // reactFireStore,
  firestoreReducer,
  reduxFirestore,
  getFirestore
} from "redux-firestore";

import {getCurrentUser} from './actions/authActions';

// Reducers
import userReducer from './reducers/userReducer';

const firebaseConfig = {
  apiKey: "AIzaSyDAHvEi-X3hvvYoFk40kpYvAW_P8-9aFHs",
  authDomain: "e-drawingfight.firebaseapp.com",
  databaseURL: "https://e-drawingfight.firebaseio.com",
  projectId: "e-drawingfight",
  storageBucket: "e-drawingfight.appspot.com",
  messagingSenderId: "1046815543674"
};

const rrfConfig = {
  // userProfile: "users",
  userFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
  timestampsInSnapshots: true
})

window.firestore = firebase.firestore();

firebase.auth().onAuthStateChanged((user) =>{
  if(user){
      //console.log('cao ',user);
      //store.dispatch({type:'GET_CURRENT_USER_SUCCESS', data:user});
      getCurrentUser(firebase.firestore(),user,store.dispatch);
  }else{
      store.dispatch({type:'GET_CURRENT_USER_SUCCESS',data:null});
  }
});

window.firebase = firebase;

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  user: userReducer
});

const initialState = {};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    )
);

export default store;
