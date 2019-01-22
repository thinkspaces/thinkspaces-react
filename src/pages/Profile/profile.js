import React, { Component } from "react";

import AuthUserContext from "../../components/Authentication/AuthUserContext";
import withAuthorization from "../../components/Authentication/withAuthorization";
import { Button } from "reactstrap";
import { auth } from "../../firebase";

class Profile extends Component {
  state = {
    email: "",
    full_name: "",
    graduation: "",
    preferred_name: ""
  };

  render() {
    return (
      <div>
        <h2>Profile Page</h2>
        <Button onClick={auth.signOutUser}>Log out</Button>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser && (
              <div>
                uid:
                {authUser.uid}
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
