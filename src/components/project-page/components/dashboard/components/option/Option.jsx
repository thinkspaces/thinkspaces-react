import React from 'react';
import styled from 'styled-components';
import { components } from 'react-select';

const Option = ({ className, data, ...props }) => {
  const { label, icon } = data;
  return (
    <components.Option {...props}>
      <div className={className}>
        <img src={icon || 'http://www.gravatar.com/avatar'} alt="user icon" className="icon" />
        <span>{label}</span>
      </div>
    </components.Option>
  );
};

export default styled(Option)`
  .icon {
    border-radius: 1000px;
    width: 20px;
    margin-right: 10px;
  }

  display: flex;
  align-items: center;
`;
