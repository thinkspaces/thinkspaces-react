// Libraries
import React from "react";

// Components
import { Title } from "components/shared/typography";

// Styles
import { pa } from "styles/utilities";

const Section = ({ ariaLabel, emoji, title }) => (
  <Title level={3} css={pa(5)}>
    <span role="img" aria-label={ariaLabel}>
      {emoji}
    </span>
    &nbsp;{title}
  </Title>
);

export default Section;
