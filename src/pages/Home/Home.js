import React, { Component } from "react";
import sizeMe from "react-sizeme";

import { Button, Row, Col } from "reactstrap";
import ProjectCard from "../../components/ui/project/ProjectCard/ProjectCard";
import SubmitProjectButton from "../../components/ui/buttons/SubmitProjectButton";

import { db } from "../../firebase";

const headerStyle = {
  margin: "50px 0px",
  textAlign: "center"
};

const buttonStyle = {
  margin: "20px 10px"
};

const trendingStyle = {
  padding: "5px"
};

class Home extends Component {
  state = {
    projects: []
  };

  componentDidMount = async () => {
    let projects = await db.getTopProjects();
    this.setState({ projects });
  };

  updateLikes = (likes, index) => {
    const { projects } = this.state;
    projects[index].likes = likes;
    this.setState({ projects });
  };

  goToProjects = () => {
    const { history } = this.props;
    history.push("/projects");
  };

  render() {
    const { projects } = this.state;
    const { width } = this.props.size;
    return (
      <div>
        <div style={headerStyle}>
          <h1>Thinkspaces</h1>
          <h3>Find and work on projects started by Yalies</h3>
          <Button onClick={this.goToProjects} style={buttonStyle} outline>
            Browse Projects
          </Button>
          <SubmitProjectButton />
        </div>
        <br />
        <h3 style={trendingStyle}>
          <span role="img" aria-label="Fire">
            🔥
          </span>
          &nbsp;Noteworthy
        </h3>
        <Row>
          {projects.slice(0, 3).map((p, i) => (
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
                updateLikes={likes => this.updateLikes(likes, i)}
              />
            </Col>
          ))}
        </Row>
        <h3 style={trendingStyle}>
          <span role="img" aria-label="BikingMan">
            🚴‍
          </span>
          &nbsp;Up and Coming
        </h3>
        <Row>
          {projects.slice(3, 6).map((p, i) => (
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
                updateLikes={likes => this.updateLikes(likes, i)}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  // render() {
  //   const { width } = this.props.size;
  //
  //   return (
  //     <div>
  //       <div style={headerStyle}>
  //         <h1>Thinkspaces</h1>
  //         <h3>Find and work on projects started by Yalies</h3>
  //         <Button onClick={this.goToProjects} style={buttonStyle} outline>
  //           Browse Projects
  //         </Button>
  //         <SubmitProjectButton />
  //       </div>
  //       <br />
  //       <h3 style={trendingStyle}>
  //         <span role="img" aria-label="Fire">
  //           🔥
  //         </span>
  //         &nbsp;Noteworthy
  //       </h3>
  //       <Row>
  //         <Col sm>
  //           <ProjectCard
  //             width={width}
  //             id="wwUdHZ7mZ9vs7i7jEoDO"
  //             title="RAMP"
  //             shortname="ramp"
  //             image="https://firebasestorage.googleapis.com/v0/b/thinkspaces-a730b.appspot.com/o/projectpictures%2Framp.png?alt=media&token=3a2f6c1a-34ea-4fa4-87d3-96b0b102c3b0"
  //             text="RAMP is a free, intuitive, multilingual digital platform that connects the Greater New Haven community to resources such as food, education, healthcare, housing, legal assistance, and employment. We are currently looking for a volunteer Research Assistant for qualitative community-based research, Marketing Lead, and Fundraising Lead "
  //           />
  //         </Col>
  //         <Col sm>
  //           <ProjectCard
  //             width={width}
  //             id="VdnM4yC3ja52pYdNrrP7"
  //             title="Slashed"
  //             shortname="Slashed-"
  //             image="https://firebasestorage.googleapis.com/v0/b/thinkspaces-a730b.appspot.com/o/projectpictures%2Fd76618be-a6e1-420f-a582-f797c972a68b.png?alt=media&token=c9c2f645-3546-414e-b488-225cd0770493"
  //             text="Slashed is creating a smooth map, displaying all student friendly stores in your area. "
  //           />
  //         </Col>
  //         <Col sm>
  //           <ProjectCard
  //             width={width}
  //             id="BqeVjXffpd5fPu7jrU1q"
  //             title="Homecooked"
  //             shortname="homecooked"
  //             image="https://i.imgur.com/1zb0koc.jpg"
  //             text="A social dining app that lets you book homecooked meals made by people in your neighborhood."
  //           />
  //         </Col>
  //       </Row>
  //       <br />
  //       <h3 style={trendingStyle}>
  //         <span role="img" aria-label="BikingMan">
  //           🚴‍
  //         </span>
  //         &nbsp;Up and Coming
  //       </h3>
  //       <Row>
  //         <Col sm>
  //           <ProjectCard
  //             width={width}
  //             id="4NBBuiCNfqRoOSqtiKI6"
  //             title="Bird Box Blue Book"
  //             shortname="Bird-Box Blue-Book"
  //             image="https://i.imgur.com/3SvmD9j.jpg"
  //             text="Export your Yale courses to your calendar"
  //           />
  //         </Col>
  //         <Col sm>
  //           <ProjectCard
  //             width={width}
  //             id="p8NQdZmlXVT0lx3LuKif"
  //             title="Visionary Health"
  //             shortname="visionaryhealth"
  //             image="https://i.imgur.com/PKpZUP9.jpg"
  //             text="An AI/Healthcare startup developing the first automated imaging screening platform."
  //           />
  //         </Col>
  //         <Col sm>
  //           <ProjectCard
  //             width={width}
  //             id="qTIDaK6yicTgv27hpkS8"
  //             title="FoodWave"
  //             shortname="FoodWave"
  //             image=""
  //             text="FoodWave will be an application used by guests at hotels while on the beach."
  //           />
  //         </Col>
  //       </Row>
  //     </div>
  //   );
  // }
}

export default sizeMe()(Home);
