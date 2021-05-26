import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';

import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {

  // unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
    // const { setCurrentUser, collectionsArray } = this.props;
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //       });
    //     });
    //   } else {
    //     setCurrentUser(userAuth);
    //   }
    // });

    /**
     * Adding shop data programatically, only need to do this once.
     */
    //  addCollectionAndDocuments('collections', collectionsArray.map(({ title, items}) => ({ title, items })));
  }

  componentWillUnmount() {
    //onAuthStateChanged() returns the unsubscribe function for the observer
    // this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route exact path='/signinandsignup' render={() => (currentUser ? (<Redirect to='/' />) : <SignInAndSignUp/>)}></Route>
          <Route exact path='/checkout' component={CheckoutPage}></Route>
        </Switch>
      </div>
    );
  }
}

/**
 * Redux pattern below for connect, mapStateToProps, and mapDispatchToProps
 * https://react-redux.js.org/api/connect
 */

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (App);

