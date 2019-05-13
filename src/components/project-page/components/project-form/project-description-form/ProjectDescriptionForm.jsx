import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SaveButton from '../../../../shared/save-button'
import { Project } from '../../../../../firebase/db';

import styles from './ProjectDescriptionForm.module.css'

const schema = Yup.object().shape(
  { name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .required('Required') },
);

const ProjectDescriptionForm = (props) => {
  const { pid } = props
  const project = new Project(pid)
  const [ initData, setInitData ] = useState({ name: '', description: '' })
  const [ success, setSuccess ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const handleSave = async (values) => {
    setLoading(true)
    await project.update(values)
    setSuccess(true)
    setLoading(false)
  }

  const handleSetup = async () => {
    setLoading(true)
    const { name, description } = await project.read();
    setInitData({ name, description });
    setLoading(false)
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
          onSubmit={values => handleSave(values)}
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
              <SaveButton loading={loading} success={success} type="submit" />
            </Form>
          )}
        />
      </div>
    </>
  );
}

export default ProjectDescriptionForm
