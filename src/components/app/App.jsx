/* eslint react/prefer-stateless-function: 0 */
/* eslint no-undef: 0 */
import React from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import { ThemeProvider } from 'styled-components';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faCircleNotch,
  faTimes,
  faRandom,
  faCheckCircle,
  faTimesCircle,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

import { Container } from 'reactstrap';
import Navbar from '../shared/navbar';
import Footer from '../shared/footer';

import Home from '../home';
import About from '../about';
import ProjectPage from '../project-page';
import SignUpIn from '../sign-up-login';
import ProfilePage from '../profile-page';
import ExploreProfiles from '../explore-profiles';
import ExploreProjects from '../explore-projects';
import ForgotPassword from '../forgot-password';

import './App.css';
import useUser from '../../hooks/use-user';

const mainContainerStyle = { marginBottom: '100px', marginTop: '50px' };

// Google Analytics
ReactGA.initialize('UA-128353649-1');
ReactGA.pageview(window.location.pathname + window.location.search);

// font awesome
library.add(
  faPlus,
  faTimes,
  faCircleNotch,
  faRandom,
  faCheckCircle,
  faTimesCircle,
  faExternalLinkAlt,
);

const App = () => {
  useUser(true);
  return (
    <ThemeProvider theme={{ mode: 'bubbly' }}>
      <div className="App">
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:700&display=swap"
          rel="stylesheet"
        />
        <Navbar />
        <Container style={mainContainerStyle}>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/projects" exact component={ExploreProjects} />
          <Route path="/projects/:shortname" exact component={ProjectPage} />
          <Route path="/profiles" exact component={ExploreProfiles} />
          <Route path="/profile/:id" exact component={ProfilePage} />
          <Route path="/signupin" exact component={SignUpIn} />
          <Route path="/signupin/forgotpassword" exact component={ForgotPassword} />
          <MessengerCustomerChat pageId="1191043211036808" appId="295451067827152" />
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
