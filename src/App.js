import React, { Component } from "react";
import { Route } from "react-router-dom";
import ReactGA from "react-ga";
import withAuthentication from "./components/Authentication/withAuthentication";

import DefNavbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import ProjectPage from "./components/Project/Page";
import SignUpIn from "./pages/SignUpIn/SignUpIn";
import Profile from "./pages/Profile/profile";
import SubmitProject from "./components/SubmitProject/SubmitProject";
import Explore from "./pages/Explore/Explore";

import { Container } from "reactstrap";

import "./App.css";

const mainContainerStyle = {
  marginBottom: "100px",
  marginTop: "50px"
};

// Google Analytics
ReactGA.initialize("UA-128353649-1");
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  render() {
    return (
      <div className="App">
        <DefNavbar />
        <Container style={mainContainerStyle}>
          <Route path="/" exact component={Home} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/about" exact component={About} />
          <Route path="/projects/:shortname" exact component={ProjectPage} />
          <Route path="/profiles" exact component={Explore} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/signupin" exact component={SignUpIn} />
          <Route path="/submitproject" exact component={SubmitProject} />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withAuthentication(App);
