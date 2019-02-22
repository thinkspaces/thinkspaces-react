import React from 'react';

import { withRouter } from 'react-router-dom';
import Login from '../../components/ui/registration/Login';
import SignUp from '../../components/ui/registration/SignUp';

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
