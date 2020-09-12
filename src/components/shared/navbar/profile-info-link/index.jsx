// Libraries
import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

// Components
import {
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

// Styles
import { NavLink } from "components/shared/navbar/styles";

const ProfileInfoLink = ({ user, logoutUser }) => {
  return user ? (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {isEmpty(user.preferred_name) ? user.full_name : user.preferred_name}
      </DropdownToggle>
      <DropdownMenu right>
        <Link style={{ textDecoration: "none" }} to={`/profile/${user.id}`}>
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
  );
};

ProfileInfoLink.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  logoutUser: PropTypes.func,
};

export default ProfileInfoLink;
