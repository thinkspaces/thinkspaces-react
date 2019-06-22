import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import CardImage from './components/card-image';
import CardTitle from './components/card-title';
import CardBody from './components/card-body';
import CardTags from './components/card-tags';

const Container = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(33, 33, 33, 0.2);
  border-radius: 0.5rem;
  margin-bottom: 10px;
  min-width: 318px;
  max-width: 320px;

  :hover {
    cursor: pointer;
  }

  :hover #project-title {
    text-decoration: underline;
    color: #0056b3;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  padding: 30px 20px 0px;
  max-height: min-content;
`;

const Card = ({ history, name, shortname, description, image, tags, allTags }) => {
  const openProject = () => {
    if (shortname !== undefined) {
      history.push(`/projects/${ shortname }`);
    }
  };

  return (
    <Container onClick={openProject}>
      <CardHeader>
        <CardTitle title={name} />
        <CardImage image={image} />
      </CardHeader>
      <CardTags tags={tags} allTags={allTags} />
      <CardBody>{description}</CardBody>
    </Container>
  );
};

Card.defaultProps = {
  description: '',
};

export default withRouter(Card);
