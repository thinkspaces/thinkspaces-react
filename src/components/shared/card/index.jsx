// Libraries
import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

// Components
import CardImage from "components/shared/card/components/card-image";
import CardTitle from "components/shared/card/components/card-title";
import CardBody from "components/shared/card/components/card-body";
import CardTags from "components/shared/card/components/card-tags";
import LikeButton from "components/shared/like-button";

const Container = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(33, 33, 33, 0.2);
  border-radius: 2rem;
  margin-bottom: 30px;
  min-width: 318px;
  max-width: 320px;

  :hover {
    cursor: pointer;
  }

  :hover #project-title {
    text-decoration: underline;
    color: #0056b3;
  }

  .like-button {
    margin-top: auto
    margin-left: auto;
    margin-right: 30px;
    margin-bottom: 30px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  padding: 30px 25px 15px;
  max-height: min-content;
`;

const Card = ({ id, history, name, shortname, description, image, tags }) => {
  const openProject = () => {
    if (shortname !== undefined) {
      history.push(`/projects/${shortname}`, { id });
    }
  };

  return (
    <Container onClick={openProject}>
      <CardHeader>
        <div>
          <CardTitle title={name} />
          <CardTags tags={tags} />
        </div>
        <CardImage image={image} />
      </CardHeader>
      <CardBody>{description}</CardBody>
      <div className="like-button">
        <LikeButton pid={id} />
      </div>
    </Container>
  );
};

Card.defaultProps = {
  description: "",
};

export default withRouter(Card);
