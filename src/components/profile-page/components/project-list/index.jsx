// Libraries
import React, { Component } from "react";

// Components
import { Row, Col } from "reactstrap";
import Card from "components/shared/card";
import SubmitProjectButton from "components/shared/submit-project-button";

// Utilities
import { db } from "../../../../firebase";

const ProjectGrid = ({ projects }) => (
  <Row>
    {projects.map((p, i) => (
      <Col sm key={i}>
        <Card
          name={p.name}
          shortname={p.shortname}
          description={p.description}
          image={p.images && p.images[0]}
          // likes={p.likes}
          // updateLikes={likes => updateLikes(likes, i)}
        />
      </Col>
    ))}
  </Row>
);

class MyProjects extends Component {
  state = { projects: [] };

  componentDidMount = async () => {
    const { uid } = this.props;
    if (!uid) return;
    const projects = await db.getAllByFilter("projects")(
      db.where("team")("array-contains")(uid)
    );
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
