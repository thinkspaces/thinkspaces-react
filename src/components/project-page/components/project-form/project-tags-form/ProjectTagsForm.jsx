import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from 'yup';
import styles from './ProjectTagsForm.module.css'
import { getProject, setProject, getTags } from '../../../../../firebase/db';

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
    // const { tags } = project;
    // console.log(tags)

    const tags = await getTags()
    console.log(tags)
    // setInitData({ name, description });
  }

  useEffect(() => {
    handleSetup();
  }, []);

  return (
    <>
      <h2>Tags</h2>
      <div className={styles.wrapper}>
        <Formik
          onSubmit={(values, actions) => handleSave(values, actions)}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <h5>Category</h5>
              <span>Choose up to three to categorize your project</span>
              <div className={styles.fieldCombo}>
                <Field
                  type="checkbox"
                  name="name"
                  value="Hello"
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
