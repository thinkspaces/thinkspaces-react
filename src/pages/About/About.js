import React from 'react';
import { Col, Row } from 'reactstrap';

import BaseContainer from '../../components/navigation/BaseContainer/BaseContainer';
import withAuthorization from '../../components/Authentication/withAuthorization';

const headerStyle = { margin: '50px 0px 50px 0px', textAlign: 'center' };

const About = () => (
  <BaseContainer>
    <div style={headerStyle}>
      <h2> About Thinkspaces </h2>
    </div>
    <Row>
      <Col md={{ size: 9, offset: 4 }}>
        <img width="40%" alt="thinking" src="https://i.imgur.com/E1LnmWB.png" />
      </Col>
      <br />
    </Row>

    <br />
    <Row>
      <Col md={{ size: 8, offset: 2 }}>
        <div>
          <br />
          <h3>Make collaboration easier with Thinkspaces. </h3>
          <br />
          <h3>
            We help you connect with the creatives and intellectuals who get things done, just like
            you. Expand beyond your network to build a better future with people who have different
            skills but the same vision.
          </h3>
          <br />
          <h3>
            Simply post whatever you are working on - creative passion project, startup, club
            project, anything - to find people to pursue your idea with you. Or get involved in a
            meaningful project from Thinkspaces, and do good things together.
          </h3>
        </div>
        <br />
        <h3>Contact us at teamthinkspaces@gmail.com </h3>
      </Col>
    </Row>
  </BaseContainer>
);

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(About);
