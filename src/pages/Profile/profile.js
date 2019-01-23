import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";

import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import { db } from "../../firebase";

import ProfileOverview from '../../components/ProfileParts/Overview';

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
        <ProfileOverview/>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Profile);
