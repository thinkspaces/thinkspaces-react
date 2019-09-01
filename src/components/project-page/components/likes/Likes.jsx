import React from 'react';
import styled from 'styled-components';
import LikeButton from '../../../shared/like-button/LikeButton';

const Container = styled.section`
  padding-left: 30px;
  grid-area: likes;

  @media (max-width: 768px) {
    padding-left: 0;
    text-align: center;
  }
`;

const Likes = ({ pid }) => (
  <Container>
    <LikeButton pid={pid} />
  </Container>
);

export default Likes;
