import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse,
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
  DropdownMenu } from 'reactstrap';
import logo from '../../../logo-circle.png';
import AuthUserContext from '../../Authentication/AuthUserContext';
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
          <NavbarBrand href="/">
            <div style={{ display: 'flex', flex: 1 }}>
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
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/projects">Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profiles">People</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>

              <AuthUserContext.Consumer>
                {authUser => (authUser ? (
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
                    <NavLink href="/signupin">Login/Sign Up</NavLink>
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
