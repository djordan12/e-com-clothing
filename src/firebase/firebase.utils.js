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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, object);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(
        doc => {
            const { title, items } = doc.data();
            return {
                routeName: encodeURI(title).toLowerCase(),
                id: doc.id,
                title,
                items
            }
        }
    )

    /**
     * Using reduce to transform the datastructure
     */
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;