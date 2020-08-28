import React from "react";
import { Col, Row } from "reactstrap";

const About = () => (
  <div>
    <div style={{ marginBottom: "20px" }}>
      <h2> About Thinkspaces </h2>
    </div>
    <Row>
      <Col>
        <p>
          <br />
          <h5>
            Welcome to Thinkspaces! We're here to make collaboration easier by
            connecting you with other Yalies who get things done, just like you.
          </h5>
          <br />
          <h4>Here's how it works:</h4>
          <br />
          <h5 style={{ fontWeight: "bold" }}>
            If you are looking for teammates,
          </h5>
          <h5>
            simply post whatever you are working on - be it a startup, lab,
            event, art production, or any other project - and who you need.
            Then, Thinkspaces members can view your project and connect with you
            if interested.
          </h5>
          <br />
          <h5 style={{ fontWeight: "bold" }}>
            If you are looking for a project,
          </h5>
          <h5>
            explore the Projects pages, find ones that interest you, see if you
            could be a good fit, and connect with the team.
          </h5>
        </p>
        <br />
        <h5>
          If you have any other questions, check out our FAQ below and contact
          us at teamthinkspaces@gmail.com{" "}
        </h5>
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
        <p>
          <br />
          <h4>Frequently Asked Questions </h4>
          <br />
          <h5 style={{ fontWeight: "bold" }}>
            Who's posting on Thinkspaces and what type of projects will I find?
          </h5>
          <br />
          <h5>
            We support all types of projects from a diversity of disciplines and
            development stages! We hope that everyone on campus can be working
            on something they are passionate about and that suite their career
            interests. Most Thinkspaces projects have been founded by
            undergraduate students, but we also host projects from graduate
            students as well as administrators and professors. Both paid and
            unpaid positions are encouraged!
          </h5>
          <br />
          <br />
          <h5 style={{ fontWeight: "bold" }}>
            No student has reached out to indicate interest in my
            project/opportunity. What do I do?
          </h5>
          <br />
          <h5>
            We have found that students generally look more highly upon projects
            with clear expectations. Check to see if you are being specific
            about who you are looking for on your Thinkspaces project page. Some
            things to consider are time commitment, responsibilities, and
            expectations. A useful exercise is to imagine that you yourself are
            the project seeker. What sorts of information would you need to gain
            interest in a project?
          </h5>
          <br />
          <h5>
            Also make sure to add tags that are relevant to your project. Tags
            ensure that Thinkspaces members will find your project when they
            filter for specific interests and types of opportunities. You may
            edit and add tags in your project dashboard.
          </h5>
          <br />
          <br />
          <h5 style={{ fontWeight: "bold" }}>
            I'm a college student, but I don't have a ton of concrete skills.
            Should I still apply to projects?
          </h5>
          <br />
          <h5>
            Yes, yes and yes! First, you have more skills than you think. Look
            back at projects you have worked on in your past years of college or
            even in high school. What were your tasks? What was your role? Write
            down this info on your Thinkspaces profile even if they might seem
            frivolous.
          </h5>
          <br />
          <h5>
            Second,all you really need in life is a strong willingness to learn.
            Find projects and opportunities that interest you on Thinkspaces,
            and even if you do not correspond to what the team is looking for,
            reach out to them. Explain that you do not have a ton of skills or
            experience but that you are super mega intersted in what they are
            doing and that you will work your butt off if they give you a
            chance!
          </h5>
          <br />
          <br />
          <h5 style={{ fontWeight: "bold" }}>
            I have zero coding skills. Will anyone want me?
          </h5>
          <br />
          <h5>
            If you are wondering this, it might be because you have noticed that
            quite a few projects on Thinkspaces are looking for coders. But do
            not fret, there is a place for you on Thinkspaces. A lot of projects
            and opportunities are looking for people with a background in
            business, art, design, engineering, econ, etc. or even just someone
            with a strong interest in the project's topic.
          </h5>
          <br />
          <h5>
            Do not limit yourself in your search of projects and opportunities.
            Even if a team only indicates that they are looking for coders, it
            is worth reaching out to them, telling them about yourself and your
            interest in their project, and asking if you could help them with
            anything else. You might be surprised by their answer!
          </h5>
        </p>
        <br />
      </Col>
    </Row>
  </div>
);

export default About;
