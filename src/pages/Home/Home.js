import React, { Component } from 'react';
import sizeMe from 'react-sizeme';

import { Button, Row, Col } from 'reactstrap';
import ProjectCard from '../../components/ui/project/ProjectCard/ProjectCard';
import SubmitProjectButton from '../../components/ui/buttons/SubmitProjectButton';

import { db } from '../../firebase';

const headerStyle = { margin: '50px 0px',
  textAlign: 'center' };

const buttonStyle = { margin: '20px 10px' };

const trendingStyle = { padding: '5px' };

class Home extends Component {
  state = { projects: [] };

  componentDidMount = async () => {
    const projects = await db.getTopProjects();
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

  render() {
    const { projects } = this.state;
    const { size: { width } } = this.props;
    return (
      <div>
        <div style={headerStyle}>
          <h1>Thinkspaces</h1>
          <h3>Find and work on projects started by Yalies</h3>
          <Button onClick={this.goToProjects} style={buttonStyle} outline>
            Browse Projects
          </Button>
          <SubmitProjectButton />
        </div>
        <br />
        <h3 style={trendingStyle}>
          <span role="img" aria-label="Fire">
            🔥
          </span>
          &nbsp;Noteworthy
        </h3>
        <Row>
          {projects.slice(0, 3).map((p, i) => (
            <Col sm key={i}>
              <ProjectCard
                width={width}
                key={i}
                id={p.id}
                title={p.title}
                image={p.images[0]}
                text={p.card_des}
                shortname={p.shortname}
                likes={p.likes}
                updateLikes={likes => this.updateLikes(likes, i)}
              />
            </Col>
          ))}
        </Row>
        <h3 style={trendingStyle}>
          <span role="img" aria-label="BikingMan">
            🚴‍
          </span>
          &nbsp;Up and Coming
        </h3>
        <Row>
          {projects.slice(3, 6).map((p, i) => (
            <Col sm key={i}>
              <ProjectCard
                width={width}
                key={i}
                id={p.id}
                title={p.title}
                image={p.images[0]}
                text={p.card_des}
                shortname={p.shortname}
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
