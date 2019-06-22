import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  img {
    max-width: 120px;
    max-height: 84px;
    width: auto;
    height: auto;
  }
`;

const CardImage = ({ image }) => (
  <Container>
    <img src={image || 'https://via.placeholder.com/300'} alt="project cover" />
  </Container>
);

export default CardImage;
