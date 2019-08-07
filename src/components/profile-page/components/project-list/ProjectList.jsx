import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { db } from '../../../../firebase';

import ProjectCard from '../../../shared/project-card';
import SubmitProjectButton from '../../../shared/submit-project-button';

const ProjectGrid = ({ width, projects, updateLikes }) => (
  <Row>
    {projects.map((p, i) => (
      <Col sm key={i}>
        <ProjectCard
          width={width}
          key={i}
          id={p.id}
          title={p.title}
          image={p.images[0]}
          text={p.card_des}
          likes={p.likes}
          updateLikes={likes => updateLikes(likes, i)}
        />
      </Col>
    ))}
  </Row>
);

class MyProjects extends Component {
  state = { projects: [] };

  componentDidMount = async () => {
    const { uid } = this.props;
    const projects = await db.getAllByFilter('projects')(db.where('team')('array-contains')(uid));
    this.setState({ projects });
  };

  updateLikes = (likes, index) => {
    const { projects } = this.state;
    projects[index].likes = likes;
    this.setState({ projects });
  };

  render() {
    const { projects } = this.state;
    return (
      <section>
        {projects.length === 0 ? (
          <div>
            <h3>No projects yet. Change that by submitting an idea!</h3>
            <SubmitProjectButton />
          </div>
        ) : (
          <ProjectGrid projects={projects} updateLikes={this.updateLikes} />
        )}
      </section>
    );
  }
}

export default MyProjects;
