import React, { Component } from "react";
import sizeMe from "react-sizeme";
// import Avatar from "react-avatar";

// database
import { db } from "../../firebase";

// custom components
import { Row, Col } from "reactstrap";
import ProfileCard from "../../components/ProfileUI/ProfileCard";

// styles
const headerStyle = {
  marginBottom: "20px"
};

class Explore extends Component {
  state = {
    profiles: []
  };

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
              <ProfileCard
                width={width}
                key={i}
                uid={p.uid}
                headline={p.headline}
                title={p.full_name}
                username={p.preferred_name}
                picture = {p.profilepicture}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default sizeMe()(Explore);
