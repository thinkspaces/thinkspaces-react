/* eslint-disable camelcase */
import React, { Component } from 'react';

import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import { Icon } from 'react-icons-kit';
import { more_2 } from 'react-icons-kit/ikons/more_2';

class PostDropdown extends Component {
  state = { dropdown: false };

  toggle = () => {
    this.setState(prevState => ({ dropdown: !prevState.dropdown }));
  };

  render() {
    const { onRemovePost, onEditPost } = this.props;
    const { dropdown } = this.state;
    return (
      <Dropdown isOpen={dropdown} toggle={this.toggle}>
        <DropdownToggle tag="span">
          <Icon icon={more_2} />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={onRemovePost}>Remove Post</DropdownItem>
          <DropdownItem onClick={onEditPost}> Edit Post</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default PostDropdown;
