import React, { Component } from "react";
import sizeMe from "react-sizeme";

// database
import { db } from "../../firebase";

// custom components
import { Row, Col } from "reactstrap";
import ProjectCard from "../../components/Project/ProjectCard";
import Avatar from "react-avatar";

// styles
const headerStyle = {
  marginBottom: "20px"
};

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: true,
      projects: [],
      isError: false
    };
  }

  componentDidMount = async () => {
    let projects = await db.getProjects();
    this.setState({ projects });
  };


  render() {
    const { width } = this.props.size;
    const { projects } = this.state;

    //console.log(projects.images);

    // let image;
    // if(projects.images[0] === null) {
    //     image = <Avatar size="100%" name={projects.title} />
    // } else {
    //     image = projects.images[0];
    // }

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
                image= {p.images}
                text={p.card_des}
                shortname={p.shortname}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default sizeMe()(Projects);
