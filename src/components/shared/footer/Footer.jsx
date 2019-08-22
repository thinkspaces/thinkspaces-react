import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  padding-left: 5%
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Footer = () => <Container>©Thinkspaces 2019. All rights reserved.</Container>;

export default Footer;
