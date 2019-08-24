import React from 'react';
import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';

const Container = styled.section`
  // .wrapper {
  //   width: 60%;
  // }

  // @media (max-width: 768px) {
  //   .wrapper {
  //     width: 100%;
  //   }
  // }

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

  .input {
    display: block;
    width: 60%;
    border-radius: 5px;
    border: 1px solid #ecf0f1;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    padding: 10px 10px;
    outline: none;
  }

  .textarea {
    width: 100%;
  }

  .about {
    height: 150px;
  }
`;

const DescriptionForm = () => (
  <Container>
    <h2>Description</h2>
    <div className="wrapper">
      <h5>Project name</h5>
      <div className="fieldCombo">
        <Field name="name" placeholder="Project name" className="input" />
        <ErrorMessage name="name" component="div" className="error" />
      </div>
      <h5>Description</h5>
      <div className="fieldCombo">
        <Field
          // component="textarea"
          name="description"
          placeholder="A brief description of your idea"
          className="input"
        />
        <ErrorMessage name="description" component="div" className="error" />
      </div>
      <h5>About</h5>
      <div className="fieldCombo">
        <Field
          component="textarea"
          name="about"
          placeholder="A thorough breakdown of your mission"
          className="input textarea about"
        />
        <ErrorMessage name="about" component="div" className="error" />
      </div>
      {/* {status && status.msg && <div>{status.msg}</div>} */}
    </div>
  </Container>
);

export default DescriptionForm;
