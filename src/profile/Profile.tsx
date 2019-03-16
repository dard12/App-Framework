import React from 'react';
import { axios } from '../App';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import './Profile.scss';

interface ProfileState {
  isLoaded: boolean;
}

class Profile extends React.Component<any, ProfileState> {
  constructor(props: any) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    axios
      .get('/user/profile')
      .then(() => {
        this.setState({ isLoaded: true });
      })
      .catch();
  }

  render() {
    if (!this.state.isLoaded) {
      return <div className="loading-large"> Loading... </div>;
    }

    return <div>Hello there!</div>;
  }
}

export default Profile;
