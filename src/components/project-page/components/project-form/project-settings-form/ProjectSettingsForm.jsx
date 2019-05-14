import React from 'react'
import ProjectShortnameForm from './project-shortname-form'
import ProjectAdminForm from './project-admin-form'
import ProjectPrivacyForm from './project-privacy-form'
import ProjectDeleteForm from './project-delete-form'
import styles from './ProjectSettingsForm.module.css'

const ProjectSettingsForm = ({ pid }) => (
  <>
    <h2>Settings</h2>
    <hr />
    <div className={styles.form}>
      <ProjectShortnameForm pid={pid} />
    </div>
    <div className={styles.form}>
      <ProjectAdminForm pid={pid} />
    </div>
    <div className={styles.form}>
      <ProjectPrivacyForm pid={pid} />
    </div>
    {/* no classname for the last item because no bottom margin needed */}
    <div>
      <ProjectDeleteForm pid={pid} />
    </div>
  </>
)

export default ProjectSettingsForm
