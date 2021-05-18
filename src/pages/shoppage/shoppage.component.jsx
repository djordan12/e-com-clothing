import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverViewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapShot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        // retrieve the collections from firebase
        const collectionRef = firestore.collection('collections');

        // As a promise
        collectionRef.get().then(snapShot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });

        // As an observable
        // this.unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapShot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });

        // A fetch, comes back in a much different datastructure than the promise / observable
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-9cbfa/databases/(default)/documents/collections')
        //     .then(response => response.json())
        //     .then(collections => console.log(collections))
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapShot();
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={
                        (props) => <CollectionsOverViewWithSpinner isLoading = { loading } { ...props }/> 
                    }/>
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={
                        (props) => <CollectionPageWithSpinner isLoading = { loading } { ...props }/>
                    }/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({ 
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);