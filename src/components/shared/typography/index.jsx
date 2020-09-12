// Libraries
import React from "react";
import {} from "styled-components/macro";

// Utilities
import { color } from "styles/utilities";
import tokens from "design-tokens";

const Title = ({ level = 1, className, children }) => {
  const Tag = `h${level}`;
  return <Tag className={className}>{children}</Tag>;
};

const Text = ({ className, children }) => {
  return (
    <span css={color(tokens.colorScheme.text.primary)} className={className}>
      {children}
    </span>
  );
};

export { Title, Text };
