import React from "react";

const Title = ({ level = 1, className, children }) => {
  const Tag = `h${level}`;
  return <Tag className={className}>{children}</Tag>;
};

const Text = ({ className, children }) => {
  return <span className={className}>{children}</span>;
};

export { Title, Text };
