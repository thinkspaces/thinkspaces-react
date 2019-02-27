/* eslint react/prefer-stateless-function: 0 */
/* eslint no-undef: 0 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { Container } from 'reactstrap';
import withAuthentication from './components/Authentication/withAuthentication';

import Navbar from './components/navigation/Navbar/Navbar';
import Footer from './components/navigation/Footer/Footer';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import ProjectPage from './pages/Projects/Page';
import SignUpIn from './pages/SignUpIn/SignUpIn';
import Profile from './pages/Profile/profile';
import SubmitProject from './pages/SubmitProject/SubmitProject';
import Explore from './pages/Explore/Explore';
import Projects from './pages/Projects/Projects';
import ForgotPassword from './pages/SignUpIn/Forgot/ForgotPassword';

import './App.css';

const mainContainerStyle = { marginBottom: '100px', marginTop: '50px' };

// Google Analytics
ReactGA.initialize('UA-128353649-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Container style={mainContainerStyle}>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/projects/:pid" exact component={ProjectPage} />
          <Route path="/profiles" exact component={Explore} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/signupin" exact component={SignUpIn} />
          <Route path="/signupin/forgotpassword" exact component={ForgotPassword} />
          <Route path="/submitproject" exact component={SubmitProject} />
          <MessengerCustomerChat pageId="1191043211036808" appId="295451067827152" />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withAuthentication(App);
