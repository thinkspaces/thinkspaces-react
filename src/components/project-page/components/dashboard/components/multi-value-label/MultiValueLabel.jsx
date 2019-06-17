import React from 'react';
import styled from 'styled-components';
import { components } from 'react-select';

const MultiValueLabel = ({ className, data, ...props }) => {
  const { label, icon } = data;
  return (
    <components.MultiValueLabel {...props}>
      <div className={className}>
        <img src={icon || 'http://www.gravatar.com/avatar'} alt="user icon" className="icon" />
        <span>{label}</span>
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
