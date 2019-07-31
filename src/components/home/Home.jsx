import React, { useState, useEffect } from 'react';
import sizeMe from 'react-sizeme';
import styled from 'styled-components';

import { Row, Col } from 'reactstrap';
import Banner from './components/banner';
import ProjectCard from '../shared/project-card';

import { db } from '../../firebase';

const Header = styled.div`
  margin: 50 0;
`;

const SectionTitle = styled.h3`
  padding: 5px;
`;

const Home = ({ size, history }) => {
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    const init = async () => {
      const _projects = await db.getAllByFilter('projects')(
        db.orderBy('likesCount')('desc'),
        db.limit(6),
      );
      setProjects(_projects);
    };

    init();
  }, []);

  const updateLikes = (likes, index) => {
    projects[index].likes = likes;
    setProjects(projects);
  };

  const { width } = size;
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
            <ProjectCard
              width={width}
              key={i}
              id={p.id}
              shortname={p.shortname}
              name={p.name}
              image={p.images[0]}
              text={p.card_des}
              likes={p.likes}
              updateLikes={likes => updateLikes(likes, i)}
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
            <ProjectCard
              width={width}
              key={i}
              id={p.id}
              shortname={p.shortname}
              title={p.title}
              image={p.images[0]}
              text={p.card_des}
              likes={p.likes}
              updateLikes={likes => this.updateLikes(likes, i)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default sizeMe()(Home);
