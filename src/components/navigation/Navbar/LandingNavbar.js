import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Button } from 'reactstrap';
// import logo from '../../../logo-circle.png';

import './LandingNavbar.css';

class LandingNavbar extends Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { isOpen } = this.state;
    return (
      <Navbar color="inverse" light expand="md">
        <Container>
          <NavbarBrand href="/">
            <div className="landing-brand">
              {/* <img
                width="30px"
                height="30px"
                className="align-top rounded"
                style={{ marginRight: 10 }}
                src={logo}
                alt="Logo"
              /> */}
              <h3>Thinkspaces</h3>
            </div>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/about">
                  <Button className="about-button">About</Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/signupin">
                  <Button className="submit-button landing-style">Login</Button>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default LandingNavbar;
