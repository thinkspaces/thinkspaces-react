/* eslint no-param-reassign: 0 */
import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';

import Avatar from 'react-avatar';
import { db } from '../../../firebase';
import withAuthorization from '../../Authentication/withAuthorization';

import EditProfile from './EditProfile';

const ProfileHeader = ({ profile }) => (
  <Col>
    <div style={{ marginLeft: '15%' }}>
      <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        <div style={{ display: 'table', margin: '0 auto', marginBottom: 15 }}>
          {profile.profilepicture ? (
            <img
              style={{ maxHeight: '150px', borderRadius: '50%' }}
              src={profile.profilepicture}
              alt="profile"
            />
          ) : (
            <Avatar size="150" name={profile.full_name} round />
          )}
        </div>
        <h2 style={{ display: 'inline-block' }}>{profile.full_name}</h2>
      </div>
      <br />
      <h5>{profile.email}</h5>
      <h5>Graduation: {profile.graduation}</h5>
      <br />
      <br />
      <h5> {profile.headline} </h5>
    </div>
  </Col>
);

const ProfileDetails = ({ profile, toggleEdit, puid, auid }) => (
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
    {puid === auid && (
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

class ProfileOverview extends Component {
  state = { profile: null, isEditing: false };

  toggleEdit = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  };

  componentDidMount = async () => {
    const { match } = this.props;
    if (match.params.id) {
      const uid = match.params.id;
      const profile = await db.getUserProfile(uid);
      this.setState({ uid, profile: profile.data() });
    }
  };

  componentDidUpdate = async (prevProps) => {
    const { match } = this.props;
    if (prevProps.match.params.id !== match.params.id) {
      const uid = match.params.id;
      const profile = await db.getUserProfile(uid);
      this.setState({ uid, profile: profile.data() });
    }
  };

  saveChanges = async () => {
    const { profile } = this.state;

    await db.saveProfileChanges(profile);
    this.setState({ isEditing: false });
  };

  onEditChange = ({ target: { type, checked, value, id } }) => {
    if (type === 'checkbox') {
      value = !checked;
    }

    this.setState(prevState => ({ profile: { ...prevState.profile, [id]: value } }));
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
          onCancel={() => this.setState({ isEditing: false })}
          uid={uid}
        />
      );
    }
    return (
      <div>
        {profile && (
          <div>
            <Row>
              <ProfileHeader profile={profile} />
              <ProfileDetails
                puid={uid}
                auid={authUser.uid}
                profile={profile}
                toggleEdit={this.toggleEdit}
              />
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(ProfileOverview);
