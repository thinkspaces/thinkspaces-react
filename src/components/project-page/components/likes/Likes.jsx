import React from 'react';
import styled from 'styled-components';
import LikeButton from '../../../shared/like-button/LikeButton';

const Container = styled.section`
  padding-left: 30px;
  grid-area: likes;
`;

const Likes = ({ pid }) => (
  <Container>
    <LikeButton pid={pid} />
  </Container>
);

export default Likes;
