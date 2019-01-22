import React, { Component } from "react";

import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import { db } from "../../firebase";

class Profile extends Component {
  state = {
    profile: null
  };

  componentDidMount = async () => {
    let profile = await db.getUserProfile();
    this.setState({ profile: profile.data() });
  };

  render() {
    const { profile } = this.state;
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser && (
              <div>
                {profile && (
                  <div>
                    <h2>{profile.full_name}</h2>
                    <div>{profile.email}</div>
                    <div>Graduation: {profile.graduation}</div>
                  </div>
                )}
                <div>uid: {authUser.uid}</div>
              </div>
            )
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Profile);
