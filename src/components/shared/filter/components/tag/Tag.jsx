/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';

import { Button } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { ic_clear } from 'react-icons-kit/md/ic_clear';

const Tag = ({ text, handleCancel, className }) => (
  <Button onClick={handleCancel} className={className}>
    {text} <Icon icon={ic_clear} />
  </Button>
);

export default styled(Tag)`
  margin-right: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
