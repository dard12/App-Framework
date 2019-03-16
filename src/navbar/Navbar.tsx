import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import { LoginContext, axios, AppState } from '../App';

import './Navbar.scss';

class Navbar extends Component {
  navItems(appState: AppState) {
    const { loggedIn, logout } = appState;

    if (loggedIn) {
      return (
        <React.Fragment>
          <Link to="/profile" className="brand">
            Test App
          </Link>

          <li>
            <Link
              to="/login"
              className="logout-btn"
              onClick={() => {
                if (logout) {
                  logout();
                  axios.get('/logout');
                  history.push('/login');
                }
              }}
            >
              Logout
            </Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="brand">
            Test App
          </Link>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="navbar-container">
        <ul className="navbar">
          <LoginContext.Consumer>{this.navItems}</LoginContext.Consumer>
        </ul>
      </div>
    );
  }
}

export default Navbar;
