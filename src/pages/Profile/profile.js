import React, { Component } from "react";

// import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import Overview from "../../components/ProfileUI/Overview";

class Profile extends Component {
  render() {
    return (
      <div>
        <Overview />
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Profile);
