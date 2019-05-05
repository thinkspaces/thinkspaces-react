import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from 'yup';
import styles from './ProjectDescriptionForm.module.css'
import { getProject, setProject } from '../../../../../firebase/db';

const schema = Yup.object().shape({ name: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
description: Yup.string()
  .required('Required') });

const ProjectDescriptionForm = (props) => {
  const { pid } = props
  const [ initData, setInitData ] = useState({ name: '', description: '' })
  const [ success, setSuccess ] = useState(false);

  const handleSave = async (values, actions) => {
    await setProject(pid, values)
    actions.setSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  }

  const handleSetup = async () => {
    const project = await getProject(pid)
    const { name, description } = project;
    setInitData({ name, description });
  }

  useEffect(() => {
    handleSetup();
  }, []);

  return (
    <>
      <h2>Description</h2>
      <div className={styles.wrapper}>
        <Formik
          enableReinitialize
          validationSchema={schema}
          initialValues={{ name: initData.name,
            description: initData.description }}
          onSubmit={(values, actions) => handleSave(values, actions)}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <h5>Project name</h5>
              <div className={styles.fieldCombo}>
                <Field
                  name="name"
                  placeholder="Project name"
                  className="text-input"
                />
                <ErrorMessage name="name" component="div" className={styles.error} />
              </div>
              <h5>Description</h5>
              <div className={styles.fieldCombo}>
                <Field
                  component="textarea"
                  name="description"
                  placeholder="A brief description of your idea"
                  className="text-input"
                />
                <ErrorMessage name="description" component="div" className={styles.error} />
              </div>
              {status && status.msg && <div>{status.msg}</div>}
              <div className={styles.save}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="defBtn"
                >
                                  Save
                </button>
                {isSubmitting ? (
                  <div className="fade-in-animation">
                    <FontAwesomeIcon
                      icon="circle-notch"
                      spin
                    />
                  </div>
                ) : null}
                {success ? (
                  <div className="fade-in-animation">
                    <FontAwesomeIcon icon="check-circle" />
                  </div>
                ) : null}
              </div>
            </Form>
          )}
        />
      </div>
    </>
  );
}

export default ProjectDescriptionForm
