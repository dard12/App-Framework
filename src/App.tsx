import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import history from './history';
import Navbar from './navbar/Navbar';
import Landing from './landing/Landing';
import Login from './login/Login';
import Profile from './profile/Profile';

const LoginContext = React.createContext<AppState>({
  loggedIn: false,
  login: undefined,
  logout: undefined
});

function getAxios(token = localStorage.getItem('token')) {
  const params = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  return Axios.create(params);
}

let axios = getAxios();

const NotFound = () => (
  <h1>Whoops! We can't find the page you're looking for.</h1>
);

export interface AppState {
  loggedIn: boolean;

  login:
    | (({ token }: { token: string }, callback: () => void) => void)
    | undefined;

  logout: (() => void) | undefined;
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loggedIn: Boolean(localStorage.getItem('token')),
      login: this.login.bind(this),
      logout: this.logout.bind(this)
    };
  }

  login({ token }: { token: string }, callback: () => void) {
    if (token) {
      localStorage.setItem('token', token);

      axios = getAxios();

      this.setState({ loggedIn: true }, callback);
    }
  }

  logout() {
    localStorage.removeItem('token');

    axios = getAxios();

    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
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
      </LoginContext.Provider>
    );
  }
}

export { App, LoginContext, axios };
