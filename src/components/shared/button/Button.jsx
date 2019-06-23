import { oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';

const buttonStyle = theme.variants('mode', 'variant', {
  outlined: {
    bubbly: css`
      border: 2px solid ${ props => props.color || '#ff6e6e' };
      color: ${ props => props.color || '#ff6e6e' };
      font-weight: bold;

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
  padding: 0.2em 1em;
  font-family: HelveticaNeue;
  border-radius: 3px;
  ${ buttonStyle }
`;

Button.propTypes = {
  variant: oneOf([ 'outlined', 'link', 'filled' ]),
};

Button.defaultProps = {
  variant: 'filled',
};

export default Button;
