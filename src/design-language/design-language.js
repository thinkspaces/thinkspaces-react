import styled, { css } from 'styled-components';

// const Link = ({ className, children }) => <a className={className}>{children}</a>;

export const StyledLink = styled('a')`
  font-face: HelveticaNeue;
  font-weight: bold;
  font-size: 20px;
`;

export const GeneralButtonOutline = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #ff6e6e;
  color: #ff6e6e;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${ props => props.primary
    && css`
      background: #ff6e6e;
      color: white;
    ` }
`;

export const GeneralButtonFilled = styled.button`
  background: #ff6e6e;
  border-radius: 3px;
  border: 2px solid #ff6e6e;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${ props => props.primary
    && css`
      background: #ff6e6e;
      color: white;
    ` }
`;

export const BlueButtonFilled = styled.button`
  background: #5d70ff;
  border-radius: 3px;
  border: 2px solid #5d70ff;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${ props => props.primary
    && css`
      background: #ff6e6e;
      color: white;
    ` }
`;

export const InverseButtonOutline = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid white;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${ props => props.primary
    && css`
      background: #ff6e6e;
      color: white;
    ` }
`;

export const InverseButtonFilled = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid white;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${ props => props.primary
    && css`
      background: #ff6e6e;
      color: white;
    ` }
`;

export const BannerContainer = styled.div`
  color: #ff6e6e;
  display: flex;
  flex-direction: row;
`;

export const CardProjectName = styled.h4`
  font-weight: bold;
  color: #2b2b2b;
`;
