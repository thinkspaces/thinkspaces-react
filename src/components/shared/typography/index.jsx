// Libraries
import React from "react";
import {} from "styled-components/macro";

// Utilities
import { color } from "styles/utilities";
import tokens from "design-tokens";

const InnerTitleWrapper = ({ level = 1, className, children }) => {
  const Tag = `h${level}`;
  return <Tag className={className}>{children}</Tag>;
};

const Title = ({ children, ...props }) => {
  return (
    <InnerTitleWrapper css={color(tokens.colorScheme.title.primary)} {...props}>
      {children}
    </InnerTitleWrapper>
  );
};

const Text = ({ className, children }) => {
  return (
    <span css={color(tokens.colorScheme.text.primary)} className={className}>
      {children}
    </span>
  );
};

export { Title, Text };
