import React, { Component } from "react";

import Login from "../../components/ui/registration/Login";
import SignUp from "../../components/ui/registration/SignUp";
import { withRouter } from "react-router-dom";

class SignUpIn extends Component {
  render() {
    return (
      <div>
        <div style={{ maxWidth: 400 }}>
          <Login />
          <hr />
          <SignUp />
        </div>
      </div>
    );
  }
}

export default withRouter(SignUpIn);
