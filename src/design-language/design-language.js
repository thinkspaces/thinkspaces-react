import styled, { css } from 'styled-components';

// const Link = ({ className, children }) => <a className={className}>{children}</a>;

export const StyledLink = styled('a')`
  font-face: HelveticaNeue;
  font-weight: bold;
  font-size: 20px;
`;

export const GeneralButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #ff6e6e;
  color: #ff6e6e;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${ props => props.primary
    && css`
      background: palevioletred;
      color: white;
    ` }
`;

export const BannerContainer = styled.div`
  color: #ff6e6e;
  display: flex;
  flex-direction: row;
`;
