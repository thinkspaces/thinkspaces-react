import React from 'react';

import { withRouter } from 'react-router-dom';
import BaseContainer from '../../components/navigation/BaseContainer/BaseContainer';

import Login from '../../components/ui/registration/Login';

const SignUpIn = () => (
  <BaseContainer displayLinks={false}>
    <div style={{ maxWidth: 400 }}>
      <Login />
    </div>
  </BaseContainer>
);

export default withRouter(SignUpIn);
