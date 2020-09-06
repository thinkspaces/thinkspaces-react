// Libraries
import React from "react";
import styled from "styled-components";
import { components } from "react-select";

const Option = ({ className, data, ...props }) => {
  const { full_name: fullName, profilepicture } = data;
  return (
    <components.Option {...props}>
      <div className={className}>
        <img
          src={profilepicture || "http://www.gravatar.com/avatar"}
          alt="user icon"
          className="icon"
        />
        <span>{fullName}</span>
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
