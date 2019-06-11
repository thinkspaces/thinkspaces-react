import React, { useState } from 'react'
import { Project } from '../../../../../../firebase/models';
import SaveButton from '../../../../../shared/save-button'
import styles from './ProjectDeleteForm.module.css'

const ProjectDeleteForm = (props) => {
  const { pid } = props
  // state used for save button
  const [ loading, setLoading ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  /**
   * save the shortname to the project's document in the database
   */
  const handleDelete = async () => {
    // reset success and start load
    setSuccess(false)
    setLoading(true)
    // attempt delete
    await Project.destroy(pid)
    // stop load and set success
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
    // navigate to root
    window.location.replace('/')
  }

  return (
    <>
      <h3>Delete project</h3>
      <div className={styles.wrap}>
        <span className="helpText">
        Careful! Clicking delete will <b>irreversibly</b> delete your project,
        all its data, and scrub clean any users that refer to it.
        </span>
        <SaveButton
          onClick={handleDelete}
          className="defBtn danger"
          text="Delete"
          loading={loading}
          success={success}
          disabled={loading}
        />
      </div>
    </>
  )
}

export default ProjectDeleteForm
