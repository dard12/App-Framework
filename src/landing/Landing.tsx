import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Landing.scss';

class Landing extends Component {
  render() {
    return (
      <div className="landing-header">
        <div>
          Let's
          <Link to="/login" className="link">
            login
          </Link>
          to this app!
        </div>
      </div>
    );
  }
}

export default Landing;
