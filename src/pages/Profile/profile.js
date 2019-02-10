import React, { Component } from "react";

import withAuthorization from "../../components/Authentication/withAuthorization";
import Overview from "../../components/ui/profile/Overview";

import ProfilePosts from "../../components/ui/profile/Posts";

const SocialContentSection = () => (
  <div style={{ marginTop: 70 }}>
    <div className="d-flex">
      <a href="/">
      <h3>
        Updates</h3>
      </a>
      <h3>&nbsp;|&nbsp;</h3>
      <a href="/">
      <h3>
      My Projects</h3></a>
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
