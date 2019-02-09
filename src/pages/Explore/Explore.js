import React, { Component } from "react";
import sizeMe from "react-sizeme";

// database
import { db } from "../../firebase";

// custom components
import { Row, Col } from "reactstrap";
import ProfileCard from "../../components/ui/profile/ProfileCard/ProfileCard";

// const TabBar = ({ activeTab, toggle }) => (
//   <Nav tabs style={{ marginBottom: 20 }}>
//     <NavItem>
//       <NavLink
//         className={classnames({ active: activeTab === "1" })}
//         onClick={() => {
//           toggle("1");
//         }}
//       >
//         People
//       </NavLink>
//     </NavItem>
//     <NavItem>
//       <NavLink
//         className={classnames({ active: activeTab === "2" })}
//         onClick={() => {
//           toggle("2");
//         }}
//       >
//         Projects
//       </NavLink>
//     </NavItem>
//   </Nav>
// );

const Profiles = ({ profiles, width }) => (
  <div>
    <h2 style={{ marginBottom: "20px" }}>Find People</h2>
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
            picture={p.profilepicture}
          />
        </Col>
      ))}
    </Row>
  </div>
);

class Explore extends Component {
  state = {
    profiles: [],
    activeTab: "1"
  };

  componentDidMount = async () => {
    let profiles = await db.getProfiles();
    this.setState({ profiles });
  };

  // toggle = tab => {
  //   if (this.state.activeTab !== tab) {
  //     this.setState({
  //       activeTab: tab
  //     });
  //   }
  // };

  render() {
    const { width } = this.props.size;
    const { profiles } = this.state;

    return (
      <div>
        {/* <TabBar toggle={this.toggle} activeTab={activeTab} />
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1"> */}
        <Profiles width={width} profiles={profiles} />
        {/* </TabPane>
          <TabPane tabId="2">
            <Projects />
          </TabPane>
        </TabContent> */}
      </div>
    );
  }
}

export default sizeMe()(Explore);
