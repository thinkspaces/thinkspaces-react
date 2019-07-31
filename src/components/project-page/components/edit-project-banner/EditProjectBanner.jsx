import React from 'react';
import styled from 'styled-components';
import Button from '../../../shared/button';

const Container = styled.div`
  background-color: #ff6e6e;
  color: white;
  padding: 40px;
  font-weight: bold;
  display: flex;
  justify-content: space-around;

  h5 {
    margin-top: 10px;
  }
`;

const EditProjectBanner = ({ onEdit }) => (
  <Container>
    <h5>You are viewing the live version of your project.</h5>
    <Button variant="outlined" onClick={onEdit}>
      Edit Project
    </Button>
  </Container>
);

export default EditProjectBanner;
