// Libraries
import React from "react";
import { Link } from "react-router-dom";

// Components
import { NavbarBrand } from "reactstrap";
import { Text } from "components/shared/typography";

// Assets
import logo from "assets/logo-circle.png";

// Styles
import { Img, Layout } from "components/shared/navbar/styles";

const BrandLink = () => (
  <NavbarBrand tag={Link} to="/">
    <Layout>
      <Img src={logo} alt="Logo" />
      <Text>Thinkspaces</Text>
    </Layout>
  </NavbarBrand>
);

export default BrandLink;
