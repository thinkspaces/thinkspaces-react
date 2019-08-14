import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

import ErrorMessage from './ErrorMessage';

const Container = styled.div`
  width: 100%;
  margin-right: 10px;
`;

const LinkField = ({ title, type, index, placeholder }) => (
  <Container>
    <span className="helpText">{title}</span>
    <Field name={`links[${ index }].${ type }`} placeholder={placeholder} className="text-input" />
    <span className="helpText">
      <ErrorMessage name={`links[${ index }].${ type }`} />
    </span>
  </Container>
);

export default LinkField;
