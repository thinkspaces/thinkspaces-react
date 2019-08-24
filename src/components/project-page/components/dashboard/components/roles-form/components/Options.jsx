import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  align-self: flex-end;
  display: flex;
  margin-left: 30px;
  margin-bottom: 10px;

  > * {
    margin-right: 5px;
  }
`;

const Options = ({ onRemove, onAdd }) => (
  <Container>
    <button type="button" className="defBtn neutral" onClick={onRemove}>
      <FontAwesomeIcon icon="times" />
    </button>
    <button type="button" className="defBtn neutral" onClick={onAdd}>
      <FontAwesomeIcon icon="plus" />
    </button>
  </Container>
);

export default Options;
