import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  DropdownMenu,
} from 'reactstrap';

import logo from '../../../assets/logo-circle.png';
import AuthUserContext from '../../utils/AuthUserContext';
import { auth } from '../../../firebase';

export default class DefNavbar extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }

  // toggle method
  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  // render method
  render() {
    const { isOpen } = this.state;
    return (
      <Navbar color="inverse" light expand="md">
        <Container>
          <Link to="/">
            <NavbarBrand>
              <div style={{ display: 'flex', flex: 1 }}>
                <img
                  width="30px"
                  height="30px"
                  className="align-top rounded"
                  style={{ marginRight: 10 }}
                  src={logo}
                  alt="Logo"
                />
                <div style={{ color: 'rgba(0,0,0,.9)' }}>Thinkspaces</div>
              </div>
            </NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/projects">
                  <NavLink>Explore Projects</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/">
                  <NavLink>Submit a Project</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/about">
                  <NavLink>About</NavLink>
                </Link>
              </NavItem>

              <AuthUserContext.Consumer>
                {authUser =>
                  (authUser ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        {authUser.displayName}
                      </DropdownToggle>
                      <DropdownMenu right>
                        <Link style={{ textDecoration: 'none' }} to={`/profile/${ authUser.uid }`}>
                          <DropdownItem>My Profile</DropdownItem>
                        </Link>
                        <DropdownItem divider />
                        <DropdownItem onClick={auth.signOutUser}>Sign Out</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <NavItem color="danger">
                      <Link to="/signupin">
                        <NavLink>Login/Sign Up</NavLink>
                      </Link>
                    </NavItem>
                  ))
                }
              </AuthUserContext.Consumer>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
