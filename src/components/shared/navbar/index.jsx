// Libraries
import React, { useState } from "react";

// Components
import {
  Collapse,
  Navbar as ReactstrapNavbar,
  NavbarToggler,
  Nav,
  Container,
} from "reactstrap";
import BrandLink from "components/shared/navbar/brand-link";
import SimpleLink from "components/shared/navbar/simple-link";
import ProfileInfoLink from "components/shared/navbar/profile-info-link";

// Utilities
import useUser from "hooks/use-user";

const Navbar = () => {
  const { user, logoutUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevState) => !prevState);

  return (
    <ReactstrapNavbar color="inverse" light expand="md">
      <Container>
        <BrandLink />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <SimpleLink to="/projects" title="Explore Projects" />
            <SimpleLink to="/submitproject" title="Submit a Project" />
            <SimpleLink to="/about" title="About" />
            <ProfileInfoLink user={user} logoutUser={logoutUser} />
          </Nav>
        </Collapse>
      </Container>
    </ReactstrapNavbar>
  );
};

export default Navbar;
