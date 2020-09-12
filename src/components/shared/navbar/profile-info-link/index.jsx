// Libraries
import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import {} from "styled-components/macro";

// Components
import {
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { Text } from "components/shared/typography";

// Styles
import { NavLink } from "components/shared/navbar/styles";

// Utilities
import { color } from "styles/utilities";
import tokens from "design-tokens";

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
        <Text css={color(tokens.colorScheme.text.secondary)}>
          Login/Sign Up
        </Text>
      </NavLink>
    </NavItem>
  );
};

ProfileInfoLink.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  logoutUser: PropTypes.func,
};

export default ProfileInfoLink;
