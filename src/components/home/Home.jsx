import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import styled from 'styled-components';

import { Row, Col } from 'reactstrap';
import Button from '../shared/button';
import ProjectCard from '../shared/project-card';
import CreateProject from '../create-project';

import { db } from '../../firebase';

const Header = styled.div`
  margin: 50 0;
`;

const SectionTitle = styled.h3`
  padding: 5px;
`;

const BannerContainer = styled.div`
  span {
    font-size: 20px;
    color: #ff6e6e;
  }
`;

const HomeBanner = ({ goToProjects, goToAbout }) => (
  <BannerContainer>
    <Button variant="link" onClick={goToAbout}>
      Learn More
    </Button>
    <span>&emsp; | &emsp;</span>
    <CreateProject />
    <span>&emsp; | &emsp;</span>
    <Button variant="link" onClick={goToProjects}>
      Sign Up
    </Button>
  </BannerContainer>
);

class Home extends Component {
  state = { projects: [] };

  componentDidMount = async () => {
    const projects = await db.getAllByFilter('projects')(
      db.orderBy('likesCount')('desc'),
      db.limit(6),
    );
    this.setState({ projects });
  };

  updateLikes = (likes, index) => {
    const { projects } = this.state;
    projects[index].likes = likes;
    this.setState({ projects });
  };

  goToProjects = () => {
    const { history } = this.props;
    history.push('/projects');
  };

  goToAbout = () => {
    const { history } = this.props;
    history.push('/about');
  };

  render() {
    const { projects } = this.state;
    const {
      size: { width },
    } = this.props;
    return (
      <div>
        <Header>
          <h1>Find any opportunity anytime. </h1>
          <HomeBanner goToProjects={this.goToProjects} goToAbout={this.goToAbout} />
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
                updateLikes={likes => this.updateLikes(likes, i)}
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
  }
}

export default sizeMe()(Home);
