import React from 'react';

import { withRouter } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/sign-up';

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
