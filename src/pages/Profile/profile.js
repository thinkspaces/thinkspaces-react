import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../../components/Authentication/AuthUserContext';
import withAuthorization from '../../components/Authentication/withAuthorization';
import Overview from '../../components/ui/profile/Overview';

import MyProjects from '../../components/ui/profile/sections/MyProjects';
import ProfilePosts from '../../components/ui/profile/sections/Posts';

const SocialContentSection = ({ uid, selected }) => (
  <div style={{ marginTop: 70 }}>
    <div className="d-flex">
      <Link to="#updates">
        <h4>Updates</h4>
      </Link>
      <h4>&nbsp;|&nbsp;</h4>
      <Link to="#my-projects">
        <h4>My Projects</h4>
      </Link>
    </div>
    <hr />
    <div>
      {selected.length === 0 || selected === '#updates' ? (
        <ProfilePosts uid={uid} />
      ) : (
        <MyProjects uid={uid} />
      )}
    </div>
  </div>
);
class Profile extends Component {
  state = { uid: null, selected: '#updates' };

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params.id) {
      this.setState({ uid: match.params.id });
    }

    // if (this.props.location.hash.length !== 0) {
    //   this.setState({ selected: this.props.location.hash });
    // }
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
export default withAuthorization(authCondition)(Profile);
