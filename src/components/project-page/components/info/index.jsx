// Libraries
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-bottom: 1px solid lightgray;
  grid-area: info;
  padding-bottom: 50px;

  p {
    margin-bottom: 0px;
  }

  .tags {
    color: steelblue;
  }
`;

const Info = ({ name, description, tags }) => (
  <Container>
    <h2>{name}</h2>
    <p>{description}</p>
    <span className="tags">
      {tags.map((tag) => (
        <span>#{tag && tag.name} </span>
      ))}
    </span>
  </Container>
);

export default Info;
