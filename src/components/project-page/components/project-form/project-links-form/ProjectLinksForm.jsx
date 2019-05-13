import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import SaveButton from '../../../../shared/save-button'
import { Project } from '../../../../../firebase/db';

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
                  <SaveButton loading={loading} success={success} type="submit" />
                </div>
              )}
            />
          </Form>
        )}
      />
    </div>
  )
}

export default ProjectLinksForm
