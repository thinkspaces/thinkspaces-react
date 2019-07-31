import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Row, Col } from 'reactstrap';
import Banner from './components/banner';
import Card from '../shared/card';

import { db } from '../../firebase';

const Header = styled.div`
  margin: 50 0;
`;

const SectionTitle = styled.h3`
  padding: 5px;
`;

const Home = ({ history }) => {
  const [ projects, setProjects ] = useState([]);
  const [ allTags, setAllTags ] = useState([]);

  useEffect(() => {
    const init = async () => {
      const _projects = await db.getAllByFilter('projects')(
        db.orderBy('likesCount')('desc'),
        db.limit(6),
      );

      const _tags = await db.getAll('tags');

      setAllTags(_tags);
      setProjects(_projects);
    };

    init();
  }, []);

  return (
    <div>
      <Header>
        <h1>Find any opportunity anytime. </h1>
        <Banner
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
              name={p.name}
              shortname={p.shortname}
              description={p.description}
              image={p.images && p.images[0]}
              tags={p.tags}
              allTags={allTags}
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
              name={p.name}
              shortname={p.shortname}
              description={p.description}
              image={p.images && p.images[0]}
              tags={p.tags}
              allTags={allTags}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
