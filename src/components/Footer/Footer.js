import React from "react";

import "./Footer.css";
import { Container } from "reactstrap";
import sizeMe from "react-sizeme";

const Footer = ({ size }) => {
  return (
    <footer className="footerStyle">
      <Container>
        <span
          className={`text-muted text-style ${size.width < 375 && "mobile"}`}
        >
          © Thinkspaces 2018. All rights reserved.
        </span>
      </Container>
    </footer>
  );
};

export default sizeMe()(Footer);
