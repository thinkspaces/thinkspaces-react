import React, { Component } from "react";
import logo from "../../logo.png";
// import { auth } from "../../firebase";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

export default class DefNavbar extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isSignedIn: false
    };
  }

  // toggle method
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // renderIfSignedIn() {
  //   let loginState = auth.isSignedIn();
  //   if (loginState === true) {
  //     return (
  //       <NavItem>
  //         <NavLink href="/profile"> My Profile </NavLink>
  //       </NavItem>
  //     );
  //   }
  // }

  // render method
  render() {
    const { isSignedIn } = this.state;
    return (
      <Navbar color="inverse" light expand="md">
        <Container>
          <NavbarBrand href="/">
            <div style={{ display: "flex", flex: 1 }}>
              <img
                width="30px"
                height="30px"
                className="align-top rounded"
                style={{ marginRight: 10 }}
                src={logo}
                alt="Logo"
              />
              <div>Thinkspaces</div>
            </div>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/projects">Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>
              <NavItem color="danger">
                <NavLink href="/signupin">Sign Up/In</NavLink>
              </NavItem>
              {isSignedIn && (
                <NavItem>
                  <NavLink href="/profile"> My Profile </NavLink>
                </NavItem>
              )}
              {/* {this.renderIfSignedIn()} */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
