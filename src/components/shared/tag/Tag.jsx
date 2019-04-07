/* eslint-disable camelcase */
import React from 'react';

import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_clear } from 'react-icons-kit/md/ic_clear';

const Tag = ({ text, handleCancel }) => (
  <>
    <Button onClick={handleCancel} style={{ marginRight: 20, marginBottom: 10, marginTop: 10 }}>
      {text} <Icon icon={ic_clear} />
    </Button>
  </>
);

export default withRouter(Tag);
