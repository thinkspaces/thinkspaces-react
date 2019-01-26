import React, { Component } from "react";
import sizeMe from "react-sizeme";

// database
import { db } from "../../firebase";

// custom components
import { Row, Col } from "reactstrap";
import ProjectCard from "../../components/Project/Card";

// styles
import "./profilecard.css";
const headerStyle = {
  marginBottom: "20px"
};

class ExploreProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: true,
      profiles: [],
      isError: false
    };
  }

  componentDidMount = async () => {
    let profiles = await db.getProfiles();
    this.setState({ profiles });
  };

  render() {
    const { width } = this.props.size;
    const { profiles } = this.state;

    return (
      <div>
        <h2 style={headerStyle}>Find People</h2>
        <Row>
          {profiles.map((p, i) => (
            <Col sm key={i}>
              <ProjectCard
                width={width}
                key={i}
                title={p.full_name}
                graduation={p.graduation}
                skills={p.Skills}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default sizeMe()(ExploreProfiles);
