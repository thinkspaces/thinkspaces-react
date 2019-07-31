import React from 'react';
import styled from 'styled-components';
import Button from '../../../shared/button';
import CreateProject from '../../../create-project';

const Container = styled.div`
  span {
    font-size: 20px;
    color: #ff6e6e;
  }
`;

const Banner = ({ goToSignUp, goToAbout }) => (
  <Container>
    <Button variant="link" onClick={goToAbout}>
      Learn More
    </Button>
    <span>&emsp; | &emsp;</span>
    <CreateProject />
    <span>&emsp; | &emsp;</span>
    <Button variant="link" onClick={goToSignUp}>
      Sign Up
    </Button>
  </Container>
);

export default Banner;
