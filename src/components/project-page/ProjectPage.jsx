import React, { useState, useEffect } from 'react';
import { some, get, isNil } from 'lodash';
import { withRouter } from 'react-router-dom';

import { Row } from 'reactstrap';
import { auth } from '../../firebase';

import Dashboard from './components/dashboard';
import BannerContent from './components/banner-content';
import ProjectInfoContent from './components/project-info-content';
import SocialContentSection from './components/social-content-section';
import EditProjectBanner from './components/edit-project-banner';

import useProject from '../../hooks/use-project';

const ProjectPage = ({ location }) => {
  const [ showDashboard, setShowDashboard ] = useState(false);
  const [ editable, setEditable ] = useState(false);

  const pid = get(location, 'state.id', null);
  const { project } = useProject({ pid });

  useEffect(() => {
    const info = auth.getUserInfo();
    if (project && info) {
      const _editable = some(project.team, id => id === info.uid)
        || some(project.admin, id => id === info.uid)
        || project.owner === info.uid;
      setEditable(_editable);
    }
  }, [ project ]);

  const toggleDashboard = toggle => () => setShowDashboard(toggle);

  if (isNil(project)) {
    return <div>Loading...</div>;
  }
  if (showDashboard) {
    return <Dashboard pid={pid} onClose={toggleDashboard(false)} />;
  }
  return (
    <section>
      {editable ? <EditProjectBanner onEdit={toggleDashboard(true)} /> : <div />}
      <Row>
        <BannerContent name={project.name} images={project.images} />
        <ProjectInfoContent project={project} />
      </Row>
      <SocialContentSection
        isOwner={editable}
        projectId={pid}
        ourstory={project.about ? project.about : ''}
        selected={location.hash}
      />
    </section>
  );
};

export default withRouter(ProjectPage);
