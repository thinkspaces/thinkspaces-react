import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  // height: min-content;
  // align-self: flex-end;
`;

const CardTitle = ({ title }) => (
  <Container id="project-title">
    <h4>{title}</h4>
  </Container>
);

export default CardTitle;
