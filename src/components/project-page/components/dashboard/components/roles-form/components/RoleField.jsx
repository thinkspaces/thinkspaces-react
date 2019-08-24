import React from 'react';
import { Field } from 'formik';

import ErrorMessage from './ErrorMessage';

const RoleField = ({ className, title, type, index, placeholder, fieldType = 'input' }) => (
  <div className={className}>
    <span className="helpText">{title}</span>
    <Field
      component={fieldType}
      name={`roles[${ index }].${ type }`}
      placeholder={placeholder}
      className="text-input"
    />
    <span className="helpText">
      <ErrorMessage name={`roles[${ index }].${ type }`} />
    </span>
  </div>
);

export default RoleField;
