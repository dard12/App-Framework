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
          <Link to="/home" className={styles.brand}>
            Test App
          </Link>

          <div>
            <Link
              to="/login"
              className={styles['logout-btn']}
              onClick={() => {
                logoutAction();
                axios.get('/logout');
              }}
            >
              Logout
            </Link>
          </div>

          <div>
            <Link to="/profile">Profile</Link>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <Link to="/" className={styles.brand}>
          Test App
        </Link>
      );
    }
  }

  render() {
    return (
      <div className={styles['navbar-container']}>
        <div className={styles.navbar}>{this.navItems()}</div>
      </div>
    );
  }
}

export default connect(
  createSelector({ token: 'token' }),
  { logoutAction }
)(Navbar);
