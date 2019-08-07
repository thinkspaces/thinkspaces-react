import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-height: min-content;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  color: #007bff;
  padding: 10px 20px;
`;

const CardTags = ({ tags }) => (
  <Container>{tags.map(tag => tag && <span>#{tag.name}</span>)}</Container>
);

CardTags.defaultProps = {
  tags: [],
};

export default CardTags;
