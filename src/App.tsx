import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import Navbar from './layouts/navbar/Navbar';
import Home from './layouts/home/Home';
import Login from './layouts/login/Login';
import Profile from './layouts/profile/Profile';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Axios from 'axios';

const NotFound = () => <h1>Whoops! Page not found.</h1>;

function PrivateRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Navbar />

            <div className="page-container">
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Login} />

                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/profile" component={Profile} />

                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

const axios = Axios.create();

export { App, axios };
