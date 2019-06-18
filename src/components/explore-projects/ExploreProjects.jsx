import React, { Component } from 'react';
import sizeMe from 'react-sizeme';

// database
import { Row, Col } from 'reactstrap';
import { Shared } from '../../firebase/models';

// custom components
import ProjectCard from '../shared/project-card';
import Filter from '../shared/filter';

// styles
const headerStyle = { marginBottom: '20px' };

class ExploreProjects extends Component {
  state = { projects: [], filterTypes: [ 'project-category', 'release-status', 'organization' ] };

  componentDidMount = async () => {
    const query = Shared.constructQuery('projects')
    const projects = await Shared.getFromQuery(query)
    this.setState({ projects });
  };

  updateLikes = (likes, index) => {
    const { projects } = this.state;
    projects[index].likes = likes;
    this.setState({ projects });
  };

  render() {
    const { projects, filterTypes } = this.state;
    const { size: { width } } = this.props;
    return (
      <div>
        <h2 style={headerStyle}>All Projects</h2>
        <Filter types={filterTypes} />
        <br />
        <Row>
          {projects.map((p, i) => (
            <Col sm key={i}>
              <ProjectCard
                width={width}
                key={i}
                shortname={p.shortname}
                name={p.name}
                id={p.id}
                // title={p.title}
                // image={p.images[0]}
                // text={p.card_des}
                // likes={p.likes}
                // updateLikes={likes => this.updateLikes(likes, i)}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
export default sizeMe()(ExploreProjects);
