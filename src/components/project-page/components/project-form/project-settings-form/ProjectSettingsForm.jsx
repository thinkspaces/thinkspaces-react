import React from 'react'
import ProjectShortnameForm from './project-shortname-form'
import ProjectDeleteForm from './project-delete-form'
import ProjectPrivacyForm from './project-privacy-form'
import styles from './ProjectSettingsForm.module.css'

const ProjectSettingsForm = ({ pid }) => (
  <>
    <h2>Settings</h2>
    <hr />
    <div className={styles.form}>
      <ProjectShortnameForm pid={pid} />
    </div>
    <div className={styles.form}>
      <ProjectPrivacyForm pid={pid} />
    </div>
    <div className={styles.form}>
      <ProjectDeleteForm pid={pid} />
    </div>
  </>
)

export default ProjectSettingsForm
