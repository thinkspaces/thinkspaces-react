import React, { useState } from 'react'
import { Project } from '../../../../../../firebase/db';
import SaveButton from '../../../../../shared/save-button'
import styles from './ProjectDeleteForm.module.css'

const ProjectDeleteForm = (props) => {
  const { pid } = props
  const project = new Project(pid)

  // state used for save button
  const [ loading, setLoading ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  /**
   * save the shortname to the project's document in the database
   */
  const handleSave = async () => {
    // reset success and start load
    setSuccess(false)
    setLoading(true)

    // stop load and set success
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  }

  return (
    <>
      <h3>Delete Project</h3>
      <div className={styles.wrap}>
        <span className={styles.help}>
        Careful! Clicking delete will <b>irreversibly</b> delete your project,
        all its data, and scrub clean any users that refer to it.
        </span>
        <SaveButton
          className="defBtn danger"
          text="Delete"
          type="submit"
          loading={loading}
          success={success}
        />
      </div>
    </>
  )
}

export default ProjectDeleteForm
