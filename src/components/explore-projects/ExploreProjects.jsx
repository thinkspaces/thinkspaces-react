import React, { Component } from 'react';
import sizeMe from 'react-sizeme';

// database
import { Row, Col } from 'reactstrap';
import { db } from '../../firebase';

// custom components
import ProjectCard from '../shared/project-card';
import Filter from '../shared/filter';

// styles
const headerStyle = { marginBottom: '20px' };

class ExploreProjects extends Component {
  state = { projects: [], filterTypes: [ 'project-category', 'release-status', 'organization' ] };

  componentDidMount = async () => {
    const projects = await db.getAll('projects');
    this.setState({ projects });
  };

  updateLikes = (likes, index) => {
    const { projects } = this.state;
    projects[index].likes = likes;
    this.setState({ projects });
  };

  render() {
    const { projects, filterTypes } = this.state;
    const {
      size: { width },
    } = this.props;
    return (
      <div>
        <h2 style={headerStyle}>All Projects</h2>
        <Filter types={filterTypes} projects={projects} />
        <Row>
          {projects.map((p, i) => (
            <Col sm key={i}>
              <ProjectCard
                width={width}
                key={i}
                shortname={p.shortname}
                name={p.name}
                id={p.id}
                text={p.card_des}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
export default sizeMe()(ExploreProjects);
