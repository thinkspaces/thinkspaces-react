/* eslint no-param-reassign: 0, camelcase: 0 */
import React, { Component } from 'react';

import ReactGA from 'react-ga';
import { Button, Row, Col } from 'reactstrap';
import Avatar from 'react-avatar';

import { SizeMe } from 'react-sizeme';
import { withRouter } from 'react-router-dom';
import ContactModal from '../../../shared/contact-modal';
import { db } from '../../../../firebase';

import EditProfile from '../edit-profile';
import { User } from '../../../../firebase/models';

const ProfileHeaderBody = ({ headline }) => (
  <div style={{ marginTop: 30 }}>
    <h5> {headline} </h5>
  </div>
);

const ProfileHeaderDetails = ({ fullname, email, graduation }) => (
  <div style={{ marginTop: 10 }}>
    <ContactModal
      buttonLabel={`Contact ${ fullname }`}
      modalBody={<a href={`mailto:${ email }`}>{email}</a>}
      projectId={fullname}
      type="profile"
    />
    <br />
    <h5>Graduation: {graduation}</h5>
  </div>
);

const ProfileHeaderImage = ({ profilepicture, full_name, email, graduation }) => (
  <div>
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <ProfileImage profilepicture={profilepicture} full_name={full_name} />
      <h2 style={{ display: 'inline-block' }}>{full_name}</h2>
    </div>
    <ProfileHeaderDetails fullname={full_name} email={email} graduation={graduation} />
  </div>
);

const ProfileImage = ({ profilepicture, full_name }) => (
  <div style={{ display: 'table', margin: '0 auto', marginBottom: 15 }}>
    {profilepicture ? (
      <img style={{ maxHeight: '150px', borderRadius: '50%' }} src={profilepicture} alt="profile" />
    ) : (
      <Avatar size="150" name={full_name} round />
    )}
  </div>
);

const ProfileHeader = ({ profile, width }) => (
  <Col style={{ flexBasis: width < 720 ? 'auto' : 0, marginBottom: width < 720 ? '80px' : 0 }}>
    <div style={{ marginLeft: width < 720 ? 0 : '15%' }}>
      <ProfileHeaderImage
        profilepicture={profile.profilepicture}
        full_name={profile.full_name}
        email={profile.email}
        graduation={profile.graduation}
      />
      <ProfileHeaderBody headline={profile.headline} />
    </div>
  </Col>
);

const ProfileDetails = ({ profile, toggleEdit, isMyProfile }) => (
  <Col>
    <DetailView type="College" value={profile.university} inline />
    <hr />
    <DetailView type="Major" value={profile.major} inline />
    <hr />
    <DetailView type="Skills" value={profile.skills} />
    <hr />
    <DetailView type="Relevant Courses" value={profile.courses} />
    <hr />
    <DetailView type="Interests" value={profile.interests} />
    <br />
    {isMyProfile && (
      <Button color="danger" onClick={toggleEdit}>
        Edit Profile
      </Button>
    )}
  </Col>
);

const DetailView = ({ type, value, inline }) => (
  <div className={`${ inline && 'd-flex' }`}>
    <h4 className="text-muted">{type}:&nbsp;</h4>
    {inline ? <h4>{value}</h4> : <h5>{value}</h5>}
  </div>
);

class ProfileSummary extends Component {
  state = { profile: null, isEditing: false };

  toggleEdit = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  };

  componentDidMount = async () => {
    const { match } = this.props;
    if (match.params.id) {
      const uid = match.params.id;
      const profile = await User.get(uid)
      this.setState({ uid, profile });
    }
  };

  componentDidUpdate = async (prevProps) => {
    const { match } = this.props;
    if (prevProps.match.params.id !== match.params.id) {
      const uid = match.params.id;
      const profile = await User.get(uid)
      this.setState({ uid, profile });
    }
  };

  saveChanges = async () => {
    const { profile, uid } = this.state;

    ReactGA.event({ category: 'Acquisition',
      action: 'Sign up - completed profile user flow',
      label: uid });
    await db.saveProfileChanges(profile);
    this.setState({ isEditing: false });
  };

  onCancel = () => {
    const { uid } = this.state;
    ReactGA.event({ category: 'Acquisition',
      action: 'Sign up - did not complete profile user flow',
      label: uid });
    this.setState({ isEditing: false });
  };

  onEditChange = ({ target: { type, checked, value, id } }) => {
    if (type === 'checkbox') {
      value = !checked;
    }

    this.setState(prevState => ({ profile: { ...prevState.profile, [id]: value } }));
  };

  onPictureChange = (profilepicture = '') => {
    this.setState(prevState => ({ profile: { ...prevState.profile, profilepicture } }));
  };

  render() {
    const { profile, isEditing, uid } = this.state;
    const { authUser } = this.props;
    if (isEditing) {
      return (
        <EditProfile
          saveChanges={this.saveChanges}
          profile={profile}
          onEditChange={this.onEditChange}
          onCancel={this.onCancel}
          onPictureChange={this.onPictureChange}
          uid={uid}
        />
      );
    }
    return (
      <div>
        {profile && (
          <div>
            <SizeMe>
              {({ size }) => (
                <Row>
                  <ProfileHeader profile={profile} width={size.width} />
                  <ProfileDetails
                    isMyProfile={uid === authUser.uid}
                    profile={profile}
                    toggleEdit={this.toggleEdit}
                  />
                </Row>
              )}
            </SizeMe>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ProfileSummary);
