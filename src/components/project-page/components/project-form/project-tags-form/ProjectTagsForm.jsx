import React from 'react'
import ProjectCategoryForm from './project-category-form'
import ProjectOrganizationForm from './project-organization-form'
import styles from './ProjectTagsForm.module.css'

const ProjectTagsForm = ({ pid }) => (
  <>
    <h2>Tags</h2>
    <hr />
    <div className={styles.form}>
      <ProjectCategoryForm pid={pid} />
    </div>
    {/* no classname for the last item because no bottom margin needed */}
    <div>
      <ProjectOrganizationForm pid={pid} />
    </div>
  </>
)

export default ProjectTagsForm
