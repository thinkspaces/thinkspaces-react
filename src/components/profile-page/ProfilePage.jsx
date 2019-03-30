import React, { Component } from 'react';

import AuthUserContext from '../utils/AuthUserContext';
import withAuthorization from '../utils/withAuthorization';
import Overview from './components/profile-summary';
import SocialContentSection from './components/social-content-section';

class ProfilePage extends Component {
  state = { uid: null };

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params.id) {
      this.setState({ uid: match.params.id });
    }
  };

  componentDidUpdate = (prevProps) => {
    const { match } = this.props;
    if (prevProps.match.params.id !== match.params.id) {
      this.setState({ uid: match.params.id });
    }
  };

  render() {
    const { uid } = this.state;
    const { location: { hash } } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <Overview authUser={authUser} />
            <SocialContentSection uid={uid} selected={hash} />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(ProfilePage);
