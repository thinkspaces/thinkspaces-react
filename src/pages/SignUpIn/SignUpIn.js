import React, { Component } from "react";

import Login from "../../components/SignUpLogin/Login";
import SignUp from "../../components/SignUpLogin/SignUp";

import { withRouter } from "react-router-dom";

const fullstyle = {
  margin: "50px 300px 50px 150px"
};

class SignUpIn extends Component {
  render() {
    return (
      <div style={fullstyle}>
        <Login />
        <hr />
        <SignUp />
      </div>
    );
  }
}

export default withRouter(SignUpIn);
