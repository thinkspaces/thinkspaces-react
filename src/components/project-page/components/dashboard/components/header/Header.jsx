import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ className, close }) => (
  <div className={className}>
    <h2>Project Dashboard</h2>
    <button type="button" className="external" onClick={close}>
      <span>View project</span>
      <FontAwesomeIcon icon="external-link-alt" />
    </button>
  </div>
);

export default styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .external {
    all: unset;
    display: flex;
    align-items: center;
  }

  .external > * {
    margin-left: 10px;
  }
`;
