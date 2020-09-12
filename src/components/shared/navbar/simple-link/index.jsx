// Libraries
import React from "react";
import PropTypes from "prop-types";
import {} from "styled-components/macro";

// Components
import { NavItem } from "reactstrap";
import { Text } from "components/shared/typography";

// Styles
import { NavLink } from "components/shared/navbar/styles";

// Utilities
import { color } from "styles/utilities";
import tokens from "design-tokens";

const SimpleLink = ({ title, to }) => (
  <NavItem>
    <NavLink className="nav" to={to}>
      <Text css={color(tokens.colorScheme.text.secondary)}>{title}</Text>
    </NavLink>
  </NavItem>
);

SimpleLink.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
};

export default SimpleLink;
