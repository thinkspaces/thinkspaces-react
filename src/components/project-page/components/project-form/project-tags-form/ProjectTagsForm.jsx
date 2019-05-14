import React from 'react'
import ProjectCategoryForm from './project-category-form'
import ProjectOrganizationForm from './project-organization-form'
import ProjectReleaseForm from './project-release-form'
import styles from './ProjectTagsForm.module.css'

const ProjectTagsForm = ({ pid }) => (
  <>
    <h2>Tags</h2>
    <hr />
    <div className={styles.form}>
      <ProjectCategoryForm pid={pid} />
    </div>
    <div className={styles.form}>
      <ProjectOrganizationForm pid={pid} />
    </div>
    {/* no classname for the last item because no bottom margin needed */}
    <div>
      <ProjectReleaseForm pid={pid} />
    </div>
  </>
)

export default ProjectTagsForm
