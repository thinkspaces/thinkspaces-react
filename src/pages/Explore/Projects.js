import React, { Component } from "react";
import sizeMe from "react-sizeme";

// database
import { db } from "../../firebase";

// custom components
import { Row, Col } from "reactstrap";
import ProjectCard from "../../components/ui/project/ProjectCard/ProjectCard";

// styles
const headerStyle = {
  marginBottom: "20px"
};

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount = async () => {
    let projects = await db.getProjects();
    this.setState({ projects });
  };

  render() {
    const { width } = this.props.size;
    const { projects } = this.state;
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
                shortname={p.shortname}
                likes={p.likes}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default sizeMe()(Projects);
