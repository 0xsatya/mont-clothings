import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBQrdNM9db7mGPTfype8rMgYAqgdMEecq0",
  authDomain: "mont-clothings.firebaseapp.com",
  databaseURL: "https://mont-clothings.firebaseio.com",
  projectId: "mont-clothings",
  storageBucket: "mont-clothings.appspot.com",
  messagingSenderId: "816967948476",
  appId: "1:816967948476:web:c01b8df54089de8f1d18b9",
  measurementId: "G-JC2S1V4HJC",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
 // console.log("Snapshot data::");

  if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({displayName, 
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
  }
  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
