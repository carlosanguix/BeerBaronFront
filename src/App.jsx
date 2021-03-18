import React, { useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { whoAmI as whoAmIAction } from './actions/userActions';
import { readIsLoggedIn } from './reducers/userReducer';

function App({ whoAmI, isLoggedIn }) {
  useEffect(() => {
    whoAmI();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact>
          {!isLoggedIn ? <SignIn /> : <Redirect to="/" />}
        </Route>
        <Route path="/signup" exact>
          {!isLoggedIn ? <SignUp /> : <Redirect to="/" />}
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => ({
  whoAmI: () => dispatch(whoAmIAction()),
});

const mapStateToProps = (state) => ({
  isLoggedIn: readIsLoggedIn(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
