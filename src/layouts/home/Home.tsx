import styles from './Home.module.scss';
import React from 'react';
import { connect } from 'react-redux';
import createSelector from 'selectorator';

class Home extends React.Component {
  render() {
    return <div>Your Home</div>;
  }
}

export default connect(createSelector({ token: 'token' }))(Home);
