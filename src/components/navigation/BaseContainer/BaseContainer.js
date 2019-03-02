import React from 'react';

import { Container } from 'reactstrap';
import NavBar from '../Navbar/Navbar';

const mainContainerStyle = { marginBottom: '100px', marginTop: '50px' };

const BaseContainer = ({ children, displayLinks }) => (
  <div>
    <NavBar displayLinks={displayLinks} />
    <Container style={mainContainerStyle}>{children}</Container>
  </div>
);

export default BaseContainer;
