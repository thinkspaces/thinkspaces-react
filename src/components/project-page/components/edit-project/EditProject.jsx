import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import EditProjectImages from '../../../submit-project/components/edit-project-images'
import ProjectImagesForm from '../project-form/project-images-form'
import ProjectDescriptionForm from '../project-form/project-description-form';
import ProjectTagsForm from '../project-form/project-tags-form';
import styles from './EditProject.module.css'

const EditProject = (props) => {
  const { pid } = props
  const [ currentForm, setCurrentForm ] = useState(<ProjectDescriptionForm pid={pid} />)

  const handleSidebar = (event) => {
    switch (event.target.name) {
      case 'description':
        setCurrentForm(<ProjectDescriptionForm pid={pid} />)
        break;
      case 'images':
        setCurrentForm(<ProjectImagesForm pid={pid} />);
        break;
      case 'tags':
        setCurrentForm(<ProjectTagsForm pid={pid} />);
        break;
      default:
        setCurrentForm(<ProjectDescriptionForm pid={pid} />)
        break;
    }
  }

  return (
    <>
      <h2>Edit Project</h2>
      <div className={styles.dashboard}>
        <div className={styles.sidebar}>
          <button type="button" name="description" className={styles.sidebarItem} onClick={handleSidebar}>Description</button>
          <button type="button" name="links" className={styles.sidebarItem} onClick={handleSidebar}>Links</button>
          <button type="button" name="images" className={styles.sidebarItem} onClick={handleSidebar}>Images</button>
          <button type="button" name="team" className={styles.sidebarItem} onClick={handleSidebar}>Team</button>
          <button type="button" name="tags" className={styles.sidebarItem} onClick={handleSidebar}>Tags</button>
        </div>
        <div className={styles.rightPanel}>
          { currentForm }
        </div>
      </div>
    </>
  )
};

export default EditProject;
