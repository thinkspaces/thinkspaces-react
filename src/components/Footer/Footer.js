import React from "react";
import { Container } from "reactstrap";

const footerStyle = {
  position: "absolute",
  // "margin" : "50px 0px 0px 0px",
  bottom: "0px",
  width: "100%",
  height: "60px", // fixed height of footer
  lineHeight: "60px", // vertically center text
  backgroundColor: "#f5f5f5"
};

const footer = () => {
  return (
    <div>
      <footer className="footer" style={footerStyle}>
        <Container>
          <span className="text-muted">
            © Thinkspaces 2018. All rights reserved.
          </span>
        </Container>
      </footer>
    </div>
  );
};

export default footer;
