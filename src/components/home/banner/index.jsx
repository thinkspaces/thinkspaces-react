// Libraries
import React from "react";
import styled from "styled-components";

// Components
import Button from "components/shared/button";

const Container = styled.div`
  span {
    font-size: 20px;
    color: #ff6e6e;
  }
`;

const Banner = ({ goToSignUp, goToAbout, gotoSubmit }) => (
  <Container>
    <Button variant="link" onClick={goToAbout}>
      Learn More
    </Button>
    <span>&emsp; | &emsp;</span>
    <Button variant="link" onClick={gotoSubmit}>
      Submit a Project
    </Button>
    <span>&emsp; | &emsp;</span>
    <Button variant="link" onClick={goToSignUp}>
      Sign Up
    </Button>
  </Container>
);

export default Banner;
