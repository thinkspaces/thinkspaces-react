// Libraries
import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  
  padding-left: 5%
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Footer = () => (
  <Container>©Thinkspaces 2020. All rights reserved.</Container>
);

export default Footer;
