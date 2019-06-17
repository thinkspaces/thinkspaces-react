import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

import ErrorMessage from './ErrorMessage';

const LinkField = ({ className, title, type, index, placeholder }) => (
  <div className={className}>
    <span className="helpText">{title}</span>
    <Field name={`links[${ index }].${ type }`} placeholder={placeholder} className="text-input" />
    <span className="helpText">
      <ErrorMessage name={`links[${ index }].${ type }`} />
    </span>
  </div>
);

export default styled(LinkField)`
  width: 100%;
  margin-right: 10px;
`;
