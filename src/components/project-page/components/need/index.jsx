// Libraries
import React from "react";
import styled from "styled-components";

// Components
import Button from "components/shared/button";

const Container = styled.div`

    padding: 50px 0px;
    border-bottom: 1px solid lightgray
    grid-area: need;

    p {
      font-size: 14pt;
      color: gray;
    }


  .need-header {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;

    h5 {
      margin-bottom: 0px;
    }

   
  }

  .role h5 {
    color: steelblue;
  }
`;
const Need = ({ roles, onContact }) => {
  if (roles.length === 0) {
    return null;
  }
  return (
    <Container>
      <div className="need-header">
        <h5>Who we need:</h5>
        <Button onClick={onContact}>Contact Us</Button>
      </div>
      {roles.map((role) => (
        <div className="role">
          <h5>{role.name}</h5>
          <p>{role.description}</p>
        </div>
      ))}
    </Container>
  );
};

export default Need;
