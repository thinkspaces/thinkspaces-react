// Libraries
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-height: min-content;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  color: steelblue;
  padding-top: 10px;
`;

const CardTags = ({ tags }) => (
  <Container>
    {tags.map((tag, idx) => tag && <span key={idx}>#{tag.name} &nbsp;</span>)}
  </Container>
);

CardTags.defaultProps = {
  tags: [],
};

export default CardTags;
