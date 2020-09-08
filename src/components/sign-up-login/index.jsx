// Libraries
import React from "react";
import { withRouter } from "react-router-dom";

// Components
import Login from "components/sign-up-login/components/login";
import SignUp from "components/sign-up-login/components/sign-up";

const SignUpIn = () => (
  <div>
    <div style={{ maxWidth: 400 }}>
      <Login />
      <hr />
      <SignUp />
    </div>
  </div>
);

export default withRouter(SignUpIn);
