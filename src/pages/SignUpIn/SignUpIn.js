import React from 'react';

import { withRouter } from 'react-router-dom';
import BaseContainer from '../../components/navigation/BaseContainer/BaseContainer';

import Login from '../../components/ui/registration/Login';
import SignUp from '../../components/ui/registration/SignUp';

const SignUpIn = () => (
  <BaseContainer displayLinks={false}>
    <div style={{ maxWidth: 400 }}>
      <Login />
      <hr />
      <SignUp />
    </div>
  </BaseContainer>
);

export default withRouter(SignUpIn);
