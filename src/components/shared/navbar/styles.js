// Libraries
import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavLink = styled(Link)`
  display: block;
  color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;

  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 4px;
  vertical-align: top;
`;

export const Layout = styled.div`
  display: flex;
  flex: 1;
`;
