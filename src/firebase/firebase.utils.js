import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyDEJVgEL6hHOhuOG_USnmh4sX4vmhpTaVw",
    authDomain: "crwn-db-9cbfa.firebaseapp.com",
    projectId: "crwn-db-9cbfa",
    storageBucket: "crwn-db-9cbfa.appspot.com",
    messagingSenderId: "998993486483",
    appId: "1:998993486483:web:0db4b90bfbe5564e5f2366",
    measurementId: "G-95EV711X8S"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    /**
     * Create a user reference in the firestore collection if
     * it does not exist otherwise return the userRef
     */
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

/**
 * DocumentReference vs CollectionReference
 * perform CRUD Methods (create, retrieve, update, delete)
 * .set(), .get(), .update(), .delete()
 */

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;