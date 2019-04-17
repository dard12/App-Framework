import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Navbar from './layouts/navbar/Navbar';
import Landing from './layouts/landing/Landing';
import Login from './layouts/login/Login';
import Profile from './layouts/profile/Profile';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Axios from 'axios';

const NotFound = () => (
  <h1>Whoops! We can't find the page you're looking for.</h1>
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Navbar />

            <div className="page-container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Login} />
                <Route exact path="/profile" component={Profile} />

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
