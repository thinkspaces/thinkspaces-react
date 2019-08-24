import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  justify-self: center;
  padding-bottom: 30px;

  grid-area: image;

  img {
    width: 120px;
    height: auto;
    object-fit: contain;
  }
`;

const Image = ({ images }) => (
  <Container>{images.length > 0 && <img alt="projectimage" src={images[0]} />}</Container>
);

export default Image;
