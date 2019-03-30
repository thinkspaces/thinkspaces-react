import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import ReactGA from 'react-ga';

import { db, auth } from '../../firebase';

import ProfileList from './components/profile-list';
import SignUpModal from '../shared/sign-up-modal';

class ExploreProfiles extends Component {
  state = { profiles: [], modal: false, loggedIn: false };

  componentDidMount = async () => {
    const profiles = await db.getProfiles();
    this.setState({ profiles, loggedIn: auth.isLoggedIn() });
  };

  toggle = () => this.setState(prevState => ({ modal: !prevState.modal }));

  gotoSignUp = () => {
    const { history } = this.props;
    history.push('/signupin');
  };

  openProfile = (uid, major) => {
    const { loggedIn } = this.state;
    if (loggedIn) {
      const { history } = this.props;
      ReactGA.event({ category: 'Engagement',
        action: 'Clicked on profile - user was logged in',
        label: major });
      history.push(`/profile/${ uid }`);
    } else {
      ReactGA.event({ category: 'Engagement',
        action: 'Clicked on profile - user was not logged in',
        label: major });
      this.toggle();
    }
  };

  render() {
    const { size: { width } } = this.props;
    const { profiles, modal } = this.state;
    return (
      <div>
        <SignUpModal isOpen={modal} toggle={this.toggle} signUp={this.gotoSignUp} />
        <ProfileList width={width} profiles={profiles} openProfile={this.openProfile} />
      </div>
    );
  }
}

export default sizeMe()(ExploreProfiles);
