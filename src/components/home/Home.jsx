import React from 'react';
import styled from 'styled-components';

import { Row, Col } from 'reactstrap';
import Banner from './components/banner';
import Card from '../shared/card';
import useProjects from '../../hooks/use-projects';

const Header = styled.div`
  margin: 50 0;
`;

const SectionTitle = styled.h3`
  padding: 5px;
`;

const Home = ({ history }) => {
  const projects = useProjects();
  return (
    <div>
      <Header>
        <h1>Find any opportunity anytime. </h1>
        <Banner
          gotoSubmit={() => history.push('/submitproject')}
          goToSignUp={() => history.push('/signupin')}
          goToAbout={() => history.push('/about')}
        />
      </Header>
      <br />
      <SectionTitle>
        <span role="img" aria-label="Fire">
          🔥
        </span>
        &nbsp;Noteworthy
      </SectionTitle>
      <Row>
        {projects.slice(0, 3).map((p, i) => (
          <Col sm key={i}>
            <Card
              id={p.id}
              name={p.name}
              shortname={p.shortname}
              description={p.description}
              image={p.images && p.images[0]}
              tags={p.tags}
            />
          </Col>
        ))}
      </Row>
      <SectionTitle>
        <span role="img" aria-label="BikingMan">
          🚴‍
        </span>
        &nbsp;Up and Coming
      </SectionTitle>
      <Row>
        {projects.slice(3, 6).map((p, i) => (
          <Col sm key={i}>
            <Card
              id={p.id}
              name={p.name}
              shortname={p.shortname}
              description={p.description}
              image={p.images && p.images[0]}
              tags={p.tags}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
