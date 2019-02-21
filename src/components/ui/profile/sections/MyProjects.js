import React, { Component } from "react";
import sizeMe from "react-sizeme";
import { db } from "../../../../firebase";

import { Row, Col } from "reactstrap";
import ProjectCard from "../../project/ProjectCard/ProjectCard";
import SubmitProjectButton from "../../buttons/SubmitProjectButton";

const ProjectGrid = ({ width, projects }) => (
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
          shortname={p.shortname}
          likes={p.likes}
        />
      </Col>
    ))}
  </Row>
);

class MyProjects extends Component {
  state = { projects: [] };

  componentDidMount = async () => {
    const { uid } = this.props;
    let projects = await db.getMyProjects(uid);
    this.setState({ projects });
  };

  render() {
    const { projects } = this.state;
    const { width } = this.props.size;
    return (
      <div style={{ paddingLeft: width <= "690" ? 0 : 50, paddingRight: 50 }}>
        {projects.length === 0 ? (
          <div>
            <h3>No projects yet. Change that by submitting an idea!</h3>
            <SubmitProjectButton />
          </div>
        ) : (
          <ProjectGrid width={width} projects={projects} />
        )}
      </div>
    );
  }
}

export default sizeMe()(MyProjects);
