import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from 'yup';
import styles from './ProjectTagsForm.module.css'
import { getProject, setProject, getTags, TagBucket, Tag, User, Project } from '../../../../../firebase/db';

const ProjectTagsForm = (props) => {
  const { pid } = props
  const [ allTags, setAllTags ] = useState([]);
  const [ success, setSuccess ] = useState(false);

  const handleSave = async (values, actions) => {
    const project = new Project(pid);

    // create two sets of tags, those that were selected (easy),
    // and those that weren't (wish Formik would make this easier)
    const selected = Object.keys(values)
    const unselected = allTags[0].tags.filter(tag => !selected.includes(tag.id))
    const selectedTags = selected.map(tag => new Tag('project-category', tag))
    const unselectedTags = unselected.map(tag => new Tag('project-category', tag.id))

    // update each selected tag with the project
    selectedTags.map(async tag => tag.addProject(project))

    // and each unselected tag too
    unselectedTags.map(async tag => tag.removeProject(project))

    // console.log(await project.read())

    // stop loading
    actions.setSubmitting(false);
    // show check mark
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  }

  const handleSetup = async () => {
    // MVP: project category/disciplines : very hacky!
    const bucket = new TagBucket('project-category')
    const data = await bucket.read()

    // query project for which tags are active
    const project = new Project(pid);
    const projectData = await project.read()
    const activeTags = projectData.tags.map(tag => tag.id)

    // modify data with active tags
    data[0].tags.forEach((value, index, array) => {
      if (activeTags.includes(value.id)) {
        value.active = true
      } else {
        value.active = false
      }
    })

    setAllTags(data)
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
              {allTags.map(bucket => (
                <>
                  <h3>{bucket.name}</h3>
                  <div className={styles.bucketWrapper}>
                    {bucket.tags.map(tag => (
                      <div className={styles.checkboxCombo}>
                        <Field
                          checked={tag.active}
                          type="checkbox"
                          name={tag.id}
                        />
                        <div>{tag.name}</div>
                      </div>
                    ))}
                  </div>
                  <hr />
                </>
              ))}
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />

              {/* status stuff */}
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

export default ProjectTagsForm
