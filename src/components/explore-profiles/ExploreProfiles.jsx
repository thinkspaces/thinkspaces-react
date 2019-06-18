import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import ReactGA from 'react-ga';

import { auth } from '../../firebase';
import { Shared } from '../../firebase/models';

import ProfileList from './components/profile-list';
import SignUpModal from '../shared/sign-up-modal';
import Filter from '../shared/filter';

class ExploreProfiles extends Component {
  state = { profiles: [], modal: false, loggedIn: false };

  componentDidMount = async () => {
    const query = Shared.constructQuery('users').where('privacy.visibleInSearch', '==', true)
    const profiles = await Shared.getFromQuery(query)
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
        <h2 style={{ marginBottom: '20px' }}>Find People</h2>
        <Filter />
        <SignUpModal isOpen={modal} toggle={this.toggle} signUp={this.gotoSignUp} />
        <ProfileList width={width} profiles={profiles} openProfile={this.openProfile} />
      </div>
    );
  }
}

export default sizeMe()(ExploreProfiles);
