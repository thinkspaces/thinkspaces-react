import React, { Component } from 'react';
import sizeMe from 'react-sizeme';

import { Button, Row, Col } from 'reactstrap';
import ProjectCard from '../shared/project-card';
// import SubmitProjectButton from '../shared/submit-project-button';
import CreateProject from '../create-project';

import { db } from '../../firebase';
import styles from './Home.module.css';

const headerStyle = { margin: '50px 0px', textAlign: 'center' };
const buttonStyle = { margin: '20px 10px' };
const trendingStyle = { padding: '5px' };

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

  render() {
    const { projects } = this.state;
    const {
      size: { width },
    } = this.props;
    return (
      <div>
        <div style={headerStyle}>
          <h1>Thinkspaces</h1>
          <h3>Find and work on projects started by Yalies</h3>
          <div className={styles.buttonsWrap}>
            <Button onClick={this.goToProjects} style={buttonStyle} outline>
              Browse Projects
            </Button>
            <CreateProject />
          </div>
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
