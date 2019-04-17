import styles from './Landing.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <div>
          Let's
          <Link to="/login" className={styles.link}>
            login
          </Link>
          to this app!
        </div>
      </div>
    );
  }
}

export default Landing;
