import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

/**
 *  Redux Thunk - middleware that is looking for functions prior to passing it to the reducer
 *  vs an object like the other actions above. Thunk recognizes this function and knows to pass the dispatch
 *  functionality as a paramater 
 * */
// export const fetchCollectionsStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');
//         dispatch(fetchCollectionsStart());

//         collectionRef.get().then(snapShot => {
//             const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
//             dispatch(fetchCollectionSuccess(collectionsMap));
//         }).catch(error => dispatch(fetchCollectionFailure(error.message)));
//     }
// }
