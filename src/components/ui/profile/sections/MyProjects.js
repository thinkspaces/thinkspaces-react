import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import { Row, Col } from 'reactstrap';
import { db } from '../../../../firebase';

import ProjectCard from '../../project/ProjectCard/ProjectCard';
import SubmitProjectButton from '../../buttons/SubmitProjectButton';

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
    const projects = await db.getMyProjects(uid);
    this.setState({ projects });
  };

  updateLikes = (likes, index) => {
    const { projects } = this.state;
    projects[index].likes = likes;
    this.setState({ projects });
  };

  render() {
    const { projects } = this.state;
    const { size: { width } } = this.props;
    return (
      <div style={{ paddingLeft: width <= '690' ? 0 : 50, paddingRight: width <= '690' ? 0 : 50 }}>
        {projects.length === 0 ? (
          <div>
            <h3>No projects yet. Change that by submitting an idea!</h3>
            <SubmitProjectButton />
          </div>
        ) : (
          <ProjectGrid width={width} projects={projects} updateLikes={this.updateLikes} />
        )}
      </div>
    );
  }
}

export default sizeMe()(MyProjects);
