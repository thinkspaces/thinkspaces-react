import { oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';

const buttonStyle = theme.variants('mode', 'variant', {
  outlined: {
    bubbly: css`
      border: 1px solid ${ props => props.color || '#ff6e6e' };
      color: ${ props => props.color || '#ff6e6e' };
      font-weight: bold;
      padding: 0.2em 0.5em;
      :focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem #d7d9e8;
      }
    `,
  },
  link: {
    bubbly: css`
      font-size: 20px;
      font-weight: bold;
      border: 2px solid transparent;
      color: ${ props => props.color || '#ff6e6e' };
      padding: 0.4em 1em;

      :hover {
        text-decoration: underline;
      }

      :focus {
        outline: none;
      }
    `,
  },
  filled: {
    bubbly: css`
      border: 2px solid ${ props => props.color || '#ff6e6e' };
      background: ${ props => props.color || '#ff6e6e' };
      color: white;
      font-weight: bold;
      padding: 0.4em 1em;

      :hover {
        filter: brightness(95%);
      }

      :focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem #d7d9e8;
      }
    `,
  },
});

const Button = styled.button`
  font-family: HelveticaNeue;
  border-radius: 3px;
  background: white;
  ${ buttonStyle }
`;

Button.propTypes = {
  variant: oneOf([ 'outlined', 'link', 'filled' ]),
};

Button.defaultProps = {
  variant: 'filled',
};

export default Button;
