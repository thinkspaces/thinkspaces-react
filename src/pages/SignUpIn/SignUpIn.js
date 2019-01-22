import React, { Component } from "react";

import Login from "../../components/SignUpLogin/Login";
import SignUp from "../../components/SignUpLogin/SignUp";
import { withRouter } from "react-router-dom";

class SignUpIn extends Component {
  render() {
    return (
      <div style={{ maxWidth: 400 }}>
        <Login />
        <hr />
        <SignUp />
      </div>
    );
  }
}

export default withRouter(SignUpIn);
