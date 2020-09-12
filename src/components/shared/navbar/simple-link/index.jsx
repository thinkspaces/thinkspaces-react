// Libraries
import React from "react";
import PropTypes from "prop-types";

// Components
import { NavItem } from "reactstrap";

// Styles
import { NavLink } from "components/shared/navbar/styles";

const SimpleLink = ({ title, to }) => (
  <NavItem>
    <NavLink className="nav" to={to}>
      {title}
    </NavLink>
  </NavItem>
);

SimpleLink.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
};

export default SimpleLink;
