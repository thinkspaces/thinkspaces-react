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
  state = {
    projects: [],
    likeStatus: false
  };

  componentDidMount = async () => {
    let projects = await db.getProjects();
    this.setState({ projects });
  };

  updateLikes = i => {
    const { projects, likeStatus } = this.state;
    if (!likeStatus == false && projects[i].likes > 0) {
      projects[i].likes = projects[i].likes - 1;
      this.setState({
        projects
      });
      //console.log("before minus one", likeStatus);
      this.setState({ likeStatus: !likeStatus });
      //console.log("minus one", likeStatus);
    } else {
      projects[i].likes = projects[i].likes + 1;
      console.log("this is like update in updateLikes", projects[i].likes);
      this.setState({
        projects
      });
      //console.log("before plus one", likeStatus);
      this.setState({ likeStatus: !likeStatus });
      //console.log("plus one", likeStatus);
    }
  };

  render() {
    const { projects } = this.state;
    const { width } = this.props.size;
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
                updateLikes={() => this.updateLikes(i)}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
export default sizeMe()(Projects);
