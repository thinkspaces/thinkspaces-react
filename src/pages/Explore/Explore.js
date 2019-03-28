import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import ReactGA from 'react-ga';

// database
import { Row, Col } from 'reactstrap';
import { db, auth } from '../../firebase';

// custom components
import ProfileCard from '../../components/ui/cards/ProfileCard/ProfileCard';
import SignUpModal from '../../components/ui/modals/SignUpModal';

const Profiles = ({ profiles, width, openProfile }) => (
  <div>
    <h2 style={{ marginBottom: '20px' }}>Find People</h2>
    <Row>
      {profiles.map((p, i) => (
        <Col sm key={i}>
          <ProfileCard
            width={width}
            key={i}
            uid={p.uid}
            headline={p.headline}
            title={p.full_name}
            picture={p.profilepicture}
            openProfile={() => openProfile(p.uid, p.major)}
          />
        </Col>
      ))}
    </Row>
  </div>
);

class Explore extends Component {
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
        <Profiles width={width} profiles={profiles} openProfile={this.openProfile} />
      </div>
    );
  }
}

export default sizeMe()(Explore);
