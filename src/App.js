import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    //onAuthStateChanged() returns the unsubscribe function for the observer
    this.unsubscribeFromAuth();
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
        </Switch>
      </div>
    );
  }
}

/**
 * Redux pattern below for connect, mapStateToProps, and mapDispatchToProps
 * https://react-redux.js.org/api/connect
 */

/**
 * mapStateToProps: a subscription to the store, any time store is updated, 
 * mapStateToProps is called: ie '{ user }' is destructured off of the state and
 * updates our 'currentUser' property on app component
 * 
 * Has a shallow equality check for every value in the object; it won't replace values if they
 * pass a shallow equality check which means it won't needlessly re-render
 */
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

/**
 * mapDispatchToProps: declared as a function taking two parameters, dispatch and ownProps
 * mapDispatchToProps is called, passing dispatch
 */
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (App);

