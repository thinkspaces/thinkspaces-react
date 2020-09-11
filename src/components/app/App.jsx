/* eslint react/prefer-stateless-function: 0 */
/* eslint no-undef: 0 */
// Libraries
import React from "react";
import { Route } from "react-router-dom";
import ReactGA from "react-ga";
import MessengerCustomerChat from "react-messenger-customer-chat";
import styled, { ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faCircleNotch,
  faTimes,
  faRandom,
  faCheckCircle,
  faTimesCircle,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

// Components
import { Container } from "reactstrap";
import Navbar from "components/shared/navbar";
import Footer from "components/shared/footer";
import Home from "components/home";
import About from "components/about";
import ProjectPage from "components/project-page";
import SignUpIn from "components/sign-up-login";
import ProfilePage from "components/profile-page";
import ExploreProjects from "components/explore-projects";
import ForgotPassword from "components/forgot-password";
import SubmitProject from "components/submit-project";

// Hooks
import useUser from "hooks/use-user";
import useProjects from "hooks/use-projects";

// Styles
import "./App.css";

// Google Analytics
ReactGA.initialize("UA-128353649-1");
ReactGA.pageview(window.location.pathname + window.location.search);

// font awesome
library.add(
  faPlus,
  faTimes,
  faCircleNotch,
  faRandom,
  faCheckCircle,
  faTimesCircle,
  faExternalLinkAlt
);

const StyledContainer = styled(Container)`
  margin-top: 50px;
  margin-bottom: 100px;
`;

const App = () => {
  useUser(true);
  useProjects(true);

  return (
    <ThemeProvider theme={{ mode: "bubbly" }}>
      <div className="App">
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:700&display=swap"
          rel="stylesheet"
        />
        <Navbar />
        <StyledContainer>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/projects" exact component={ExploreProjects} />
          <Route path="/projects/:shortname" exact component={ProjectPage} />
          <Route path="/profile/:id" exact component={ProfilePage} />
          <Route path="/signupin" exact component={SignUpIn} />
          <Route
            path="/signupin/forgotpassword"
            exact
            component={ForgotPassword}
          />
          <Route path="/submitproject" exact component={SubmitProject} />
          <MessengerCustomerChat
            pageId="1191043211036808"
            appId="295451067827152"
          />
        </StyledContainer>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
