import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

const RadioField = ({ className, index, onChange, primary }) => (
  <div className={className}>
    <span className="helpText">Primary?</span>
    <Field
      name={`links[${ index }].primary`}
      type="radio"
      checked={primary}
      value={primary}
      onChange={onChange}
      className="primary"
    />
  </div>
);

export default styled(RadioField)`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;

  .primary {
    margin-top: 15px;
  }
`;
