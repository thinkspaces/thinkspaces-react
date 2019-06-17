import React from 'react';

const Tooltip = () => (
  <span className="helpText">
    Shortname must be unique.
    <br />
    It must be between 5-20 characters in length.
    <br />
    Valid characters include: aA-zZ, 0-9 and underscores.
  </span>
);

export default Tooltip;
