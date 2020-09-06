/* eslint react/no-unused-state: 0 */
import React, { Component } from "react";
import ReactGA from "react-ga";

import { db, auth } from "../../firebase";

// import ProfileList from './components/profile-list';
import SignUpModal from "../shared/sign-up-modal";
import Filter from "../shared/filter";

class ExploreProfiles extends Component {
  state = { profiles: [], modal: false, loggedIn: false };

  componentDidMount = async () => {
    const profiles = await db.getAllByFilter("users")(
      db.where("privacy.visibleInSearch")("==")(true)
    );
    this.setState({ profiles, loggedIn: auth.isLoggedIn() });
  };

  toggle = () => this.setState((prevState) => ({ modal: !prevState.modal }));

  gotoSignUp = () => {
    const { history } = this.props;
    history.push("/signupin");
  };

  openProfile = (uid, major) => {
    const { loggedIn } = this.state;
    if (loggedIn) {
      const { history } = this.props;
      ReactGA.event({
        category: "Engagement",
        action: "Clicked on profile - user was logged in",
        label: major,
      });
      history.push(`/profile/${uid}`);
    } else {
      ReactGA.event({
        category: "Engagement",
        action: "Clicked on profile - user was not logged in",
        label: major,
      });
      this.toggle();
    }
  };

  render() {
    const { modal } = this.state;
    return (
      <div>
        <h2 style={{ marginBottom: "20px" }}>Find People</h2>
        <Filter />
        <SignUpModal
          isOpen={modal}
          toggle={this.toggle}
          signUp={this.gotoSignUp}
        />
        {/* <ProfileList width={width} profiles={profiles} openProfile={this.openProfile} /> */}
      </div>
    );
  }
}

export default ExploreProfiles;
