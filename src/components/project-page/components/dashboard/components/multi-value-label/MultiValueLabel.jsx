import React from 'react';
import styled from 'styled-components';
import { find } from 'lodash';
import { components } from 'react-select';

const MultiValueLabel = ({ className, data, selectProps, ...props }) => {
  const { options } = selectProps;
  const user = find(options, { id: data });

  if (!user) {
    return null;
  }
  return (
    <components.MultiValueLabel {...props}>
      <div className={className}>
        <img
          src={user.profilepicture || 'http://www.gravatar.com/avatar'}
          alt="user icon"
          className="icon"
        />
        <span>{user.full_name}</span>
      </div>
    </components.MultiValueLabel>
  );
};

export default styled(MultiValueLabel)`
  .icon {
    border-radius: 1000px;
    width: 20px;
    margin-right: 10px;
  }

  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
