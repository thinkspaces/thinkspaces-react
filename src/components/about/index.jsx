// Libraries
import React from "react";
import { Col, Row } from "reactstrap";
import styled from "styled-components/macro";

// Components
import { Title, Text } from "components/shared/typography";

// Styles
import { fontWeight } from "styles/utilities";

// Utilities
import tokens from "design-tokens";

const Header = styled.header`
  margin-bottom: 20px;
`;

const About = () => (
  <div>
    <Header>
      <Title level={2}>About Thinkspaces</Title>
    </Header>
    <Row>
      <Col>
        <br />
        <Title level={5} css={fontWeight(tokens.font.bold)}>
          Welcome to Thinkspaces! We<Text>&apos;</Text>re here to make
          collaboration easier by connecting you with other Yalies who get
          things done, just like you.
        </Title>
        <br />
        <Title level={4}>
          Here<Text>&apos;</Text>s how it works:
        </Title>
        <br />
        <Title level={5} css={fontWeight(tokens.font.bold)}>
          If you are looking for teammates,
        </Title>
        <Title level={5}>
          simply post whatever you are working on - be it a startup, lab, event,
          art production, or any other project - and who you need. Then,
          Thinkspaces members can view your project and connect with you if
          interested.
        </Title>
        <br />
        <Title level={5} css={fontWeight(tokens.font.bold)}>
          If you are looking for a project,
        </Title>
        <Title level={5}>
          explore the Projects pages, find ones that interest you, see if you
          could be a good fit, and connect with the team.
        </Title>
        <br />
        <Title level={5}>
          If you have any other questions, check out our FAQ below and contact
          us at teamthinkspaces@gmail.com
        </Title>
        <br />
      </Col>
      <Col md={{ size: 5 }}>
        <img
          width="100%"
          alt="thinking"
          src="https://i.imgur.com/E1LnmWB.png"
        />
      </Col>
      <br />
    </Row>

    <br />
    <br />
    <Row>
      <Col>
        <br />
        <Title level={4}>Frequently Asked Questions </Title>
        <br />
        <Title level={5} css={fontWeight(tokens.font.bold)}>
          Who<Text>&apos;</Text>s posting on Thinkspaces and what type of
          projects will I find?
        </Title>
        <br />
        <Title level={5}>
          We support all types of projects from a diversity of disciplines and
          development stages! We hope that everyone on campus can be working on
          something they are passionate about and that suite their career
          interests. Most Thinkspaces projects have been founded by
          undergraduate students, but we also host projects from graduate
          students as well as administrators and professors. Both paid and
          unpaid positions are encouraged!
        </Title>
        <br />
        <br />
        <Title level={5} css={fontWeight(tokens.font.bold)}>
          No student has reached out to indicate interest in my
          project/opportunity. What do I do?
        </Title>
        <br />
        <Title level={5}>
          We have found that students generally look more highly upon projects
          with clear expectations. Check to see if you are being specific about
          who you are looking for on your Thinkspaces project page. Some things
          to consider are time commitment, responsibilities, and expectations. A
          useful exercise is to imagine that you yourself are the project
          seeker. What sorts of information would you need to gain interest in a
          project?
        </Title>
        <br />
        <Title level={5}>
          Also make sure to add tags that are relevant to your project. Tags
          ensure that Thinkspaces members will find your project when they
          filter for specific interests and types of opportunities. You may edit
          and add tags in your project dashboard.
        </Title>
        <br />
        <br />
        <Title level={5} css={fontWeight(tokens.font.bold)}>
          I<Text>&apos;</Text>m a college student, but I don
          <Text>&apos;</Text>t have a ton of concrete skills. Should I still
          apply to projects?
        </Title>
        <br />
        <Title level={5}>
          Yes, yes and yes! First, you have more skills than you think. Look
          back at projects you have worked on in your past years of college or
          even in high school. What were your tasks? What was your role? Write
          down this info on your Thinkspaces profile even if they might seem
          frivolous.
        </Title>
        <br />
        <Title level={5}>
          Second,all you really need in life is a strong willingness to learn.
          Find projects and opportunities that interest you on Thinkspaces, and
          even if you do not correspond to what the team is looking for, reach
          out to them. Explain that you do not have a ton of skills or
          experience but that you are super mega intersted in what they are
          doing and that you will work your butt off if they give you a chance!
        </Title>
        <br />
        <br />
        <Title level={5} css={fontWeight(tokens.font.bold)}>
          I have zero coding skills. Will anyone want me?
        </Title>
        <br />
        <Title level={5}>
          If you are wondering this, it might be because you have noticed that
          quite a few projects on Thinkspaces are looking for coders. But do not
          fret, there is a place for you on Thinkspaces. A lot of projects and
          opportunities are looking for people with a background in business,
          art, design, engineering, econ, etc. or even just someone with a
          strong interest in the project<Text>&apos;</Text>s topic.
        </Title>
        <br />
        <Title level={5}>
          Do not limit yourself in your search of projects and opportunities.
          Even if a team only indicates that they are looking for coders, it is
          worth reaching out to them, telling them about yourself and your
          interest in their project, and asking if you could help them with
          anything else. You might be surprised by their answer!
        </Title>
        <br />
      </Col>
    </Row>
  </div>
);

export default About;
