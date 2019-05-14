import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectImagesForm from '../project-form/project-images-form'
import ProjectDescriptionForm from '../project-form/project-description-form';
import ProjectTagsForm from '../project-form/project-tags-form';
import ProjectTeamForm from '../project-form/project-team-form';
import ProjectLinksForm from '../project-form/project-links-form';
import ProjectSettingsForm from '../project-form/project-settings-form';

import styles from './ProjectDashboard.module.css'

const ProjectDashboard = (props) => {
  const { pid, saveChanges: close } = props
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
      case 'team':
        setCurrentForm(<ProjectTeamForm pid={pid} />);
        break;
      case 'links':
        setCurrentForm(<ProjectLinksForm pid={pid} />);
        break;
      case 'settings':
        setCurrentForm(<ProjectSettingsForm pid={pid} />);
        break;
      default:
        setCurrentForm(<ProjectDescriptionForm pid={pid} />)
        break;
    }
  }

  return (
    <>
      <div className={styles.header}>
        <h2>Project Dashboard</h2>
        <button type="button" className={styles.external} onClick={close}>
          <span>View project</span>
          <FontAwesomeIcon icon="external-link-alt" />
        </button>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.sidebar}>
          <button type="button" name="description" className={styles.sidebarItem} onClick={handleSidebar}>Description</button>
          <button type="button" name="links" className={styles.sidebarItem} onClick={handleSidebar}>Links</button>
          <button type="button" name="images" className={styles.sidebarItem} onClick={handleSidebar}>Images</button>
          <button type="button" name="team" className={styles.sidebarItem} onClick={handleSidebar}>Team</button>
          <button type="button" name="tags" className={styles.sidebarItem} onClick={handleSidebar}>Tags</button>
          <button type="button" name="settings" className={styles.sidebarItem} onClick={handleSidebar}>Settings</button>
        </div>
        <div className={styles.rightPanel}>
          { currentForm }
        </div>
      </div>
    </>
  )
};

export default ProjectDashboard;
