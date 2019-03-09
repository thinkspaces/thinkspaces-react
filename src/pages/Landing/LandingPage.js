import React, { Component } from 'react';
import './LandingPage.css';

import { SizeMe } from 'react-sizeme';

import { Row, Col } from 'reactstrap';
import ProjectCard from '../../components/ui/cards/ProjectCard/ProjectCard';
import ProfileCard from '../../components/ui/cards/ProfileCard/ProfileCard';
import SignUp from '../../components/ui/registration/SignUp';
import LandingNavbar from '../../components/navigation/Navbar/LandingNavbar';

import checkAuthorization from '../../components/Authentication/checkAuthorization';
import { db } from '../../firebase';

const LandingBanner = ({ mobile }) => (
  <div className="purple-row landing-banner">
    <div />
    <div className={`yellow-row landing-banner ${ mobile && 'mobile' }`}>
      <h1>Change the way you collaborate.</h1>
      <div className={`logo-image-container ${ mobile && 'mobile' }`}>
        <img width="400" height="400" alt="thinking" src="https://i.imgur.com/E1LnmWB.png" />
      </div>
    </div>
  </div>
);

const RegisterArea = ({ onSubmit }) => (
  <div className="registration-box">
    <SignUp onSubmit={onSubmit} />
  </div>
);

const ThinkTogetherSection = ({ mobile }) => (
  <div className="white-row">
    <div className={`think-section ${ mobile && 'mobile' }`}>
      <h1>Think Together</h1>
      <p>
        We help you connect with all the creatives and intellectuals who get things done, just like
        you. Expand beyond your network to build a better future with people who have different
        skills but the same vision.
      </p>
    </div>
  </div>
);

const StatsSection = () => (
  <div>
    <hr />
    <div style={{ paddingRight: 100 }}>
      <Row>
        <Col>
          <h2>40+ Projects</h2>
        </Col>
        <Col>
          <h2>100+ Profiles</h2>
        </Col>
        <Col>
          <h2>300+ Users</h2>
        </Col>
      </Row>
    </div>
    <hr />
  </div>
);

const ProjectSection = ({ projects }) => (
  <div className="white-row cards-section projects">
    <h2>Find your next endeavor</h2>
    <br />
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
          <br />
          <br />
        </Col>
      ))}
    </Row>
  </div>
);

const PeopleSection = ({ profiles }) => (
  <div className="white-row cards-section profiles">
    <h2>Keep good company</h2>
    <br />
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

  render() {
    const { onSubmit } = this.props;
    const { projects, profiles } = this.state;

    return (
      <SizeMe>
        {({ size }) => (
          <div className="landing-container">
            <LandingNavbar />
            <div className="landing-banner-container">
              <LandingBanner mobile={size.width < 925} />
              <RegisterArea onSubmit={onSubmit} />
            </div>
            <ThinkTogetherSection mobile={size.width < 925} />
            <br />
            <br />
            <StatsSection />
            <ProjectSection projects={projects} />
            <PeopleSection profiles={profiles} />
          </div>
        )}
      </SizeMe>
    );
  }
}

export default checkAuthorization(LandingPage);
