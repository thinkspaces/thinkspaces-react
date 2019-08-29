import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar as RSNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

import { isEmpty } from 'lodash';
import logo from '../../../assets/logo-circle.png';
import useUser from '../../../hooks/use-user';

const NavLink = styled(Link)`
  display: block;
  color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;

  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const Navbar = () => {
  const { user, logoutUser } = useUser();
  const [ isOpen, setIsOpen ] = useState(false);
  const toggle = () => setIsOpen(prevState => !prevState);

  return (
    <RSNavbar color="inverse" light expand="md">
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
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav" to="/projects">
                Explore Projects
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav" to="/submitproject">
                Submit a Project
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav" to="/about">
                About
              </NavLink>
            </NavItem>
            {user ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {isEmpty(user.preferred_name) ? user.full_name : user.preferred_name}
                </DropdownToggle>
                <DropdownMenu right>
                  <Link style={{ textDecoration: 'none' }} to={`/profile/${ user.id }`}>
                    <DropdownItem>My Profile</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem onClick={logoutUser}>Sign Out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem color="danger">
                <NavLink className="nav" to="/signupin">
                  Login/Sign Up
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </RSNavbar>
  );
};

export default Navbar;
