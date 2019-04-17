import styles from './Navbar.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { logoutAction } from '../../redux/actions/login-action';
import { axios } from '../../App';
import createSelector from 'selectorator';

interface NavbarProps {
  logoutAction: Function;
  token: string;
}

class Navbar extends React.Component<NavbarProps> {
  navItems() {
    const { logoutAction, token } = this.props;

    if (token) {
      return (
        <React.Fragment>
          <Link to="/profile" className={styles.brand}>
            Test App
          </Link>

          <li>
            <Link
              to="/login"
              className={styles['logout-btn']}
              onClick={() => {
                logoutAction();
                axios.get('/logout');
                history.push('/login');
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
          <Link to="/" className={styles.brand}>
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
      <div className={styles['navbar-container']}>
        <ul className={styles.navbar}>{this.navItems()}</ul>
      </div>
    );
  }
}

export default connect(
  createSelector({ token: 'token' }),
  { logoutAction }
)(Navbar);
