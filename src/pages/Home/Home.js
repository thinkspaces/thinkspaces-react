import React, { Component } from "react";

import { Button, Row, Col } from "reactstrap";

import ProjectCard from "../../components/Project/Card";
import "../Projects/Projects.css";

import StackGrid from "react-stack-grid";

import { db } from "../../firebase";

const headerStyle = {
  margin: "50px 0px 50px 0px",
  textAlign: "center"
};

const buttonStyle = {
  margin: "20px 10px"
};

const trendingStyle = {
  padding: "5px"
};

export default class Home extends Component {
  state = { projects: [] };

  componentDidMount = async () => {
    let projects = await db.getProjects();

    // update state
    this.setState({ projects });
  };

  render() {
    const { projects } = this.state;
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
          </span>{" "}
          Noteworthy{" "}
        </h3>

        <div>
          <StackGrid columnWidth={300}>
            {projects.map((p, i) => (
              <ProjectCard
                key={i}
                title={p.title}
                shortname={p.shortname}
                image={p.images[0]}
                text={"hiding text until card layout is fixed"}
              />
            ))}
          </StackGrid>
        </div>
        <Row className="cardGroup">
          <Col lg>
            <ProjectCard
              title="MovesU"
              shortname="moves"
              image="https://i.imgur.com/tslXFr4.jpg"
              text="A fun, social events app for and driven by college students. For events of any size, from small gatherings to massive parties."
            />
          </Col>
          <Col lg>
            <ProjectCard
              title="Verb Energy Co."
              shortname="verb"
              image="https://i.imgur.com/ClqgMEf.jpg"
              text="We believe people should have the energy to feel focused and alive every day."
            />
          </Col>
          <Col lg>
            <ProjectCard
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
          </span>{" "}
          Up and Coming{" "}
        </h3>
        <Row className="cardGroup">
          <Col lg>
            <ProjectCard
              title="Homecooked"
              shortname="homecooked"
              image="https://i.imgur.com/1zb0koc.jpg"
              text="A social dining app that lets you book homecooked meals made by people in your neighborhood."
            />
          </Col>
          <Col lg>
            <ProjectCard
              title="Visionary Health"
              shortname="visionaryhealth"
              image="https://i.imgur.com/PKpZUP9.jpg"
              text="An AI/Healthcare startup developing the first automated imaging screening platform."
            />
          </Col>
          <Col lg>
            <ProjectCard
              title="Pearl"
              shortname="pearl"
              image="https://i.imgur.com/a51qJgk.jpg"
              text="A biometric technology startup bringing the first global cloud-based biometric authentication platform to market."
            />
          </Col>
        </Row>
      </div>
    );
  }
}
