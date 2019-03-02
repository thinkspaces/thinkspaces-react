import React, { Component } from 'react';
import './LandingPage.css';

import { Button, Row, Col } from 'reactstrap';
import ProjectCard from '../../components/ui/cards/ProjectCard/ProjectCard';
import ProfileCard from '../../components/ui/cards/ProfileCard/ProfileCard';
import SignUp from '../../components/ui/registration/SignUp';

import checkAuthorization from '../../components/Authentication/checkAuthorization';
import { db } from '../../firebase';

const LandingHeader = ({ onLogin }) => (
  <div className="white-row landing-header">
    <h1>Thinkspaces</h1>
    <div className="login-button-container">
      <Button className="submit-button" onClick={onLogin}>
        Login
      </Button>
    </div>
  </div>
);

const LandingBanner = () => (
  <div className="landing-banner yellow-row">
    <h1>Change the way you collaborate.</h1>
    <div className="logo-image-container">
      <img width="400" height="400" alt="thinking" src="https://i.imgur.com/E1LnmWB.png" />
    </div>
  </div>
);

const RegisterArea = ({ onSubmit }) => (
  <div className="registration-box">
    <SignUp onSubmit={onSubmit} />
  </div>
);

const ThinkTogetherSection = () => (
  <div className="white-row">
    <div className="think-section">
      <h1>Think Together</h1>
      <p>
        We help you connect with all the creatives and intellectuals who get things done, just like
        you. Expand beyond your network to build a better future with people who have different
        skills but the same vision.
      </p>
    </div>
  </div>
);

const ProjectSection = ({ projects }) => (
  <div className="white-row cards-section projects">
    <h2>Find your next endeavor</h2>
    <Row>
      {projects.map((proj, i) => (
        <Col sm key={i}>
          <ProjectCard
            id={proj.id}
            title={proj.title}
            text={proj.card_des}
            image={proj.images[0]}
            likes={proj.likes}
          />
        </Col>
      ))}
    </Row>
  </div>
);

const PeopleSection = ({ profiles }) => (
  <div className="white-row cards-section profiles">
    <h2>Do more together</h2>
    <Row>
      {profiles.map((p, i) => (
        <Col sm key={i}>
          <ProfileCard
            uid={p.uid}
            headline={p.headline}
            title={p.full_name}
            picture={p.profilepicture}
          />
        </Col>
      ))}
    </Row>
  </div>
);

class LandingPage extends Component {
  state = { projects: [], profiles: [] };

  componentDidMount = async () => {
    const projects = await db.getLandingProjects();
    const profiles = await db.getLandingProfiles();
    this.setState({ projects, profiles });
  };

  onLogin = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/signupin');
  };

  render() {
    const { onSubmit } = this.props;
    const { projects, profiles } = this.state;

    return (
      <div className="landing-container">
        <LandingHeader onLogin={this.onLogin} />
        <div className="landing-banner-container">
          <LandingBanner />
          <RegisterArea onSubmit={onSubmit} />
        </div>
        <ThinkTogetherSection />
        <ProjectSection projects={projects} />
        <PeopleSection profiles={profiles} />
      </div>
    );
  }
}

export default checkAuthorization(LandingPage);
