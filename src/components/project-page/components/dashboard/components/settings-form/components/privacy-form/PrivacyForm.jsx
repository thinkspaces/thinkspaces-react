import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

const Container = styled.section`
  margin-bottom: 50px;
  .wrap {
    width: 60%;
  }

  @media (max-width: 768px) {
    .wrap {
      width: 100%;
    }
  }

  .checkboxCombo {
    display: flex;
    align-items: center;
  }

  .checkboxCombo > * {
    margin-right: 5px;
  }
`;

const PrivacyForm = () => (
  <Container>
    <h3>Privacy settings</h3>
    <Field
      name="privacy"
      render={({ field }) => (
        <div className="wrap">
          <div className="checkboxCombo">
            <input {...field} type="checkbox" />
            <span>Visible in search</span>
          </div>
          <span className="helpText">
            This setting prevents your project showing in search results, however it will continue
            to be available at <a href={window.location.href}>{window.location.href}</a>
          </span>
        </div>
      )}
    />
  </Container>
);

export default PrivacyForm;
