import React, { Component } from 'react';

import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_clear } from 'react-icons-kit/md/ic_clear';
import SignUpModal from '../sign-up-modal';

class Tag extends Component {
  render() {
    const { text, type, key, array, handleCancel } = this.props;
    return (
      <div>
        <Button onClick={({ text, key }) => handleCancel(text, key, array, type)}>
          {text} <Icon icon={ic_clear} />
        </Button>
      </div>
    );
  }
}

export default withRouter(Tag);
