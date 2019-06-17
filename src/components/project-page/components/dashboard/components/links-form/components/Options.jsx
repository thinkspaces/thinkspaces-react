import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Options = ({ className, onRemove, onAdd }) => (
  <div className={className}>
    <button type="button" className="defBtn neutral" onClick={onRemove}>
      <FontAwesomeIcon icon="times" />
    </button>
    <button type="button" className="defBtn neutral" onClick={onAdd}>
      <FontAwesomeIcon icon="plus" />
    </button>
  </div>
);

export default styled(Options)`
  margin-top: 25px;
  align-self: center;
  display: flex;
  margin-left: 30px;

  > * {
    margin-right: 5px;
  }
`;
