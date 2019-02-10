import React, { Component } from "react";

import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import Overview from "../../components/ui/profile/Overview";

import ProfilePosts from "../../components/ui/profile/Posts";

// {puid === auid && (
//   <Button color="danger" onClick={toggleEdit}>
//     Edit Profile
//   </Button>
// )}

const SocialContentSection = ({ uid }) => (
    <div style={{ marginTop: 70 }}>
            <div className="d-flex">
              <a href="/">
              <h4>
                Updates</h4>
              </a>
              <h4>&nbsp;|&nbsp;</h4>
              <a href="/">
              <h4>
              My Projects</h4></a>
            </div>
            <hr />
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <ProfilePosts uid={uid} />
            </div>
          </div>
    )

class Profile extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
          <AuthUserContext.Consumer>
            {authUser =>
                <div>
                    <Overview authUser={authUser} />
                    <SocialContentSection uid={location.state.uid} />
                </div>
            }
            </AuthUserContext.Consumer>
          </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Profile);
