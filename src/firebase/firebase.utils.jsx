import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCKnkKSsP5VeHZlpe7XlYb3o0qb_UXGulY",
  authDomain: "project-1-c9bad.firebaseapp.com",
  databaseURL: "https://project-1-c9bad.firebaseio.com",
  projectId: "project-1-c9bad",
  storageBucket: "project-1-c9bad.appspot.com",
  messagingSenderId: "114649032476",
  appId: "1:114649032476:web:c4bbe433ee9c0577107cd9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
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
