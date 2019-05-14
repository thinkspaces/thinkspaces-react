import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import SaveButton from '../../../../shared/save-button'
import { Project } from '../../../../../firebase/db';

const schema = Yup.object().shape({ links: Yup.array()
  .of(
    Yup.object().shape(
      { name: Yup.string().max(20, 'Name is too long').required('Name is required'),
        url: Yup.string().url('Must be a URL').required('URL is required') },
    ),
  ) });

const ProjectLinksForm = (props) => {
  const { pid } = props
  const project = new Project(pid)

  const [ links, setLinks ] = useState([]);
  const [ success, setSuccess ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const handleSetup = async () => {
    setLoading(true)
    const { links: data } = await project.read();
    setLinks(data)
    setLoading(false)
  }

  const handleSave = async (values) => {
    setSuccess(false)
    setLoading(true)
    const { links: data } = values
    await project.update({ links: data })
    setSuccess(true)
    setLoading(false)
  }

  const handleRadio = (index, values, setValues) => {
    // create a copy of the values
    const valuesCopy = JSON.parse(JSON.stringify(values))
    // set all values to false
    valuesCopy.links.forEach((link) => { link.primary = false })
    valuesCopy.links[index].primary = true
    setValues(valuesCopy)
  }

  useEffect(() => {
    handleSetup();
  }, []);

  return (
    <div>
      <h2>Add links</h2>
      <p>
        Link to external websites, social platforms, YouTube videos and more.
        We will parse each link, and show rich previews and icons on your project
        listing where possible.
      </p>
      <Formik
        validationSchema={schema}
        enableReinitialize
        initialValues={{ links }}
        onSubmit={values => handleSave(values)}
        render={({ values, setValues }) => (
          <Form>
            <FieldArray
              name="links"
              render={arrayHelpers => (
                <div>
                  {values.links && values.links.length > 0 ? (
                    values.links.map((link, index) => (
                      <div key={index}>
                        <Field name={`links[${ index }].url`} placeholder="Link URL e.g. https://google.com" />
                        <Field name={`links[${ index }].name`} placeholder="Description e.g. Our Website. Keep it short!" />
                        <Field name={`links[${ index }].primary`} type="radio" checked={link.primary} value={link.primary} onChange={() => handleRadio(index, values, setValues)} />
                        <ErrorMessage name={`links[${ index }].name`} />
                        <ErrorMessage name={`links[${ index }].url`} />
                        {/* remove */}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                        -
                        </button>
                        {/* add */}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index + 1, { name: '', url: '', primary: false })}
                        >
                        +
                        </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push({ name: '', url: '', primary: true })}>
                      {/* show this when user has removed all friends from the list */}
                    Add a link
                    </button>
                  )}
                  <SaveButton loading={loading} disabled={loading} success={success} type="submit" />
                </div>
              )}
            />
          </Form>
        )}
      />
    </div>
  )
}

const ErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? error : null;
    }}
  />
);

export default ProjectLinksForm
