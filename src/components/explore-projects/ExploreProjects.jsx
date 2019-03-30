import React, { Component } from 'react';
import sizeMe from 'react-sizeme';

// database
import { Row, Col } from 'reactstrap';
import { db } from '../../firebase';

// custom components
import ProjectCard from '../shared/project-card';

// styles
const headerStyle = { marginBottom: '20px' };

class ExploreProjects extends Component {
  state = { projects: [] };

  componentDidMount = async () => {
    const projects = await db.getProjects();
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
      <div>
        <h2 style={headerStyle}>All Projects</h2>
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
                updateLikes={likes => this.updateLikes(likes, i)}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
export default sizeMe()(ExploreProjects);
