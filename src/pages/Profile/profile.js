import React, { Component } from "react";

import withAuthorization from "../../components/Authentication/withAuthorization";
import Overview from "../../components/ui/profile/Overview";

import ProfilePosts from "../../components/ui/profile/Posts";

const SocialContentSection = () => (
  <div style={{ marginTop: 70 }}>
    <div className="d-flex">
      <a href="/">Updates</a>
      <div>&nbsp;|&nbsp;</div>
      <a href="/">My Projects</a>
    </div>
    <hr />
    <div style={{ marginLeft: 10, marginRight: 10 }}>
      <ProfilePosts />
    </div>
  </div>
);

class Profile extends Component {
  render() {
    return (
      <div>
        <Overview />
        <SocialContentSection />
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Profile);
