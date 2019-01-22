import React from "react";
import { Col, Row } from "reactstrap";

const headerStyle = {
  margin: "50px 0px 50px 0px",
  textAlign: "center"
};

const About = () => {
  return (
    <div>
      <div style={headerStyle}>
        <h2> About Thinkspaces </h2>
      </div>
      <Row>
        <Col md={{ size: 9, offset: 4 }}>
          <img
            width="40%"
            alt="thinking"
            src="https://i.imgur.com/E1LnmWB.png"
          />
        </Col>
        <br />
      </Row>

      <br />
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <p>
            <br />
            Make collaboration easier with Thinkspaces.
            <br />
            <br />
            There are a lot of talented Yalies with great ideas, but
            unfortunately not all the resources are there. In particular,
            bringing together a functional team can be difficult.
            <br />
            <br />
            As a result, we want to make it as easy for you to find the people
            you need so that you can get to working on your idea as fast as
            possible. Simply post whatever you are working on - creative passion
            project, startup, club project, anything - and utlize our network of
            creatives to help bring your idea to life.
          </p>
          <br />
          <b>Contact us at teamthinkspaces@gmail.com </b>
        </Col>
      </Row>
    </div>
  );
};

export default About;
