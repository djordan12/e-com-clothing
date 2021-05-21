import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPage from '../collection/collection.component';

// const CollectionsOverViewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    
    componentDidMount() {
        const { fetchCollectionsStart } = this.props;

        // Moved collections request to redux pattern using async redux thunk library
        fetchCollectionsStart();

        // retrieve the collections from firebase
        // const collectionRef = firestore.collection('collections');

        // As a promise
        // collectionRef.get().then(snapShot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });

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

    render() {
        const { match, isCollectionsLoaded } = this.props; 

        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    component = { CollectionsOverviewContainer } />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={
                        (props) => <CollectionPageWithSpinner isLoading = { !isCollectionsLoaded } { ...props }/>
                    }/>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded: selectIsCollectionsLoaded
})
const mapDispatchToProps = dispatch => ({ 
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);