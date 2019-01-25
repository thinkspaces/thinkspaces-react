import React, { Component } from "react";
import logo from "../../logo.png";
import AuthUserContext from "../Authentication/AuthUserContext";
import { auth } from "../../firebase";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";

export default class DefNavbar extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  // toggle method
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // render method
  render() {
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

              <AuthUserContext.Consumer>
                {authUser =>
                  authUser ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        {authUser.displayName}
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem href={`/profile/${authUser.uid}`}>
                          My Profile
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={auth.signOutUser}>
                          Sign Out
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <NavItem color="danger">
                      <NavLink href="/signupin">Login</NavLink>
                    </NavItem>
                  )
                }
              </AuthUserContext.Consumer>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
