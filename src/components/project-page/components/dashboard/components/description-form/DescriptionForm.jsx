import React from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import SaveButton from '../../../../../shared/save-button';
import useFirestoreProject from '../../../../../../hooks/use-firestore-project';
import { DescriptionSchema } from '../../validation';

const initialValues = { name: '', description: '' };

const DescriptionForm = ({ className, pid }) => {
  const { values, success, loading, handleSave } = useFirestoreProject(pid, initialValues);
  return (
    <section className={className}>
      <h2>Description</h2>
      <div className="wrapper">
        <Formik
          enableReinitialize
          validationSchema={DescriptionSchema}
          initialValues={{ name: values.name, description: values.description }}
          onSubmit={vals => handleSave(vals)}
          render={({ status }) => (
            <Form>
              <h5>Project name</h5>
              <div className="fieldCombo">
                <Field name="name" placeholder="Project name" className="text-input" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <h5>Description</h5>
              <div className="fieldCombo">
                <Field
                  component="textarea"
                  name="description"
                  placeholder="A brief description of your idea"
                  className="text-input"
                />
                <ErrorMessage name="description" component="div" className="error" />
              </div>
              {status && status.msg && <div>{status.msg}</div>}
              <SaveButton loading={loading} disabled={loading} success={success} type="submit" />
            </Form>
          )}
        />
      </div>
    </section>
  );
};

export default styled(DescriptionForm)`
  .wrapper {
    width: 60%;
  }

  @media (max-width: 768px) {
    .wrapper {
      width: 100%;
    }
  }

  .fieldCombo {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .fieldCombo > * {
    margin-right: 5px;
  }

  .error {
    font-size: 0.8rem;
    color: red;
    display: block;
  }
`;