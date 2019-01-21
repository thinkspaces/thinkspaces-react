import React, { Component } from "react";
import "../Projects/Projects.css";

import { Button, Row, Col } from "reactstrap";
import ProjectCard from "../../components/Project/Card";
import sizeMe from "react-sizeme";

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
  state = { projects: [] };

  componentDidMount = async () => {
    let projects = await db.getProjects();

    // update state
    this.setState({ projects });
  };

  render() {
    const { width } = this.props.size;

    return (
      <div>
        <div style={headerStyle}>
          <h1>Thinkspaces</h1>
          <h3>Find and work on projects started by Yalies</h3>
          <Button href="/projects" style={buttonStyle} outline>
            Browse Projects
          </Button>
          <Button
            href="https://goo.gl/forms/TWUv6iRejb64BHis2"
            style={buttonStyle}
            color="danger"
          >
            Submit a Project
          </Button>
        </div>
        <br />
        <h3 style={trendingStyle}>
          <span role="img" aria-label="Fire">
            🔥
          </span>
          &nbsp;Noteworthy
        </h3>
        {/* <Container> */}
        <Row>
          <Col sm>
            <ProjectCard
              width={width}
              title="MovesU"
              shortname="moves"
              image="https://i.imgur.com/tslXFr4.jpg"
              text="A fun, social events app for and driven by college students. For events of any size, from small gatherings to massive parties."
            />
          </Col>
          <Col sm>
            <ProjectCard
              width={width}
              title="Verb Energy Co."
              shortname="verb"
              image="https://i.imgur.com/ClqgMEf.jpg"
              text="We believe people should have the energy to feel focused and alive every day."
            />
          </Col>
          <Col sm>
            <ProjectCard
              width={width}
              title="Snackpass"
              shortname="snackpass"
              image="https://i.imgur.com/uy5sbwL.jpg"
              text="Get lit discounts and never wait in line again."
            />
          </Col>
        </Row>
        <h3 style={trendingStyle}>
          <span role="img" aria-label="BikingMan">
            🚴‍
          </span>
          &nbsp;Up and Coming
        </h3>
        <Row>
          <Col sm>
            <ProjectCard
              width={width}
              title="Homecooked"
              shortname="homecooked"
              image="https://i.imgur.com/1zb0koc.jpg"
              text="A social dining app that lets you book homecooked meals made by people in your neighborhood."
            />
          </Col>
          <Col sm>
            <ProjectCard
              width={width}
              title="Visionary Health"
              shortname="visionaryhealth"
              image="https://i.imgur.com/PKpZUP9.jpg"
              text="An AI/Healthcare startup developing the first automated imaging screening platform."
            />
          </Col>
          <Col sm>
            <ProjectCard
              width={width}
              title="Pearl"
              shortname="pearl"
              image="https://i.imgur.com/a51qJgk.jpg"
              text="A biometric technology startup bringing the first global cloud-based biometric authentication platform to market."
            />
          </Col>
        </Row>
        {/* </Container> */}
      </div>
    );
  }
}

export default sizeMe()(Home);
