import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/hompage/homepage.component";
import ShopPage from "./pages/shop/ShopPage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-signup/signin-signup.component";

import "./App.css";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { connect } from "react-redux";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    //console.log(this.props);
    //console.log(this.props.store.getState());
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
         
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    // console.log(this.state);

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path='/signin' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
                ): (
                  <SignInAndSignUpPage/>
                  )
                }
                />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({ //destructure state and use user only
  currentUser: user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
