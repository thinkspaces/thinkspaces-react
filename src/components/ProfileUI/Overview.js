import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";

import { db } from "../../firebase";
import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";

import Avatar from "react-avatar";
import EditProfile from "./EditProfile";
import ProfilePosts from "./Posts";

const DetailView = ({ type, value, inline }) => (
  <div className={`${inline && "d-flex"}`}>
    <h4 className="text-muted">{type}:&nbsp;</h4>
    {inline ? <h4>{value}</h4> : <h5>{value}</h5>}
  </div>
);

const divStyle = {
  marginLeft: "100px"
};

class ProfileOverview extends Component {
  state = {
    profile: null,
    isEditing: false
  };

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  componentDidMount = async () => {
    if (this.props.location.state) {
      let uid = this.props.location.state.uid;
      let profile = await db.getUserProfile(uid);
      this.setState({ uid, profile: profile.data() });
    }
  };

  saveChanges = async () => {
    const { profile } = this.state;

    await db.saveProfileChanges(profile);
    this.setState({ isEditing: false });
  };

  onEditChange = event => {
    let value = null;
    if (event.target.type === "checkbox") {
      value = !event.target.checked;
    } else {
      value = event.target.value;
    }

    this.setState({
      profile: {
        ...this.state.profile,
        [event.target.id]: value
      }
    });
  };

  render() {
    const { profile, isEditing, uid } = this.state;
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
    } else {
      return (
        <div>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser && (
                <div>
                  {profile && (
                    <div>
                      <Row>
                        <Col>
                          <Avatar
                            name={profile.full_name}
                            src={
                              profile.profilepicture
                                ? profile.profilepicture
                                : null
                            }
                          />
                          <h2>{profile.full_name}</h2>
                          <br />
                          <h5>{profile.email}</h5>
                          <h5>Graduation: {profile.graduation}</h5>
                          <br />
                          <br />
                          <h5> {profile.headline} </h5>
                        </Col>
                        <Col>
                          <DetailView
                            type="College"
                            value={profile.university}
                            inline
                          />
                          <hr />
                          <DetailView
                            type="Major"
                            value={profile.major}
                            inline
                          />
                          <hr />
                          <DetailView type="Skills" value={profile.skills} />
                          <hr />
                          <DetailView
                            type="Relevant Courses"
                            value={profile.courses}
                          />
                          <hr />
                          <DetailView
                            type="Interests"
                            value={profile.interests}
                          />
                          <br />
                          {uid === authUser.uid && (
                            <Button color="danger" onClick={this.toggleEdit}>
                              Edit Profile
                            </Button>
                          )}
                        </Col>
                      </Row>
                      <br />
                      <br />
                      <div className="d-flex">
                        <a href="/">Updates</a>
                        <div>&nbsp;|&nbsp;</div>
                        <a href="/">My Projects</a>
                      </div>
                      <hr />
                      <div className={divStyle}>
                        <ProfilePosts id={authUser.uid} />
                      </div>
                    </div>
                  )}
                </div>
              )
            }
          </AuthUserContext.Consumer>
        </div>
      );
    }
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(ProfileOverview);
