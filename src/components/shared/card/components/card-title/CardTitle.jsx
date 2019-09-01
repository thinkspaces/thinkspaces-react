import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  // height: min-content;
  // align-self: flex-end;
`;

const Text = styled.div`
  line-height: 1.3;
  font-size: 1.25rem;
  font-weight: bold;
`;

const CardTitle = ({ title }) => (
  <Container id="project-title">
    <Text>{title}</Text>
  </Container>
);

export default CardTitle;
