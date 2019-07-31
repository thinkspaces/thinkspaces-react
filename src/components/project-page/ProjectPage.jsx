import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import some from 'lodash/some';
import { withRouter } from 'react-router-dom';

import { Row } from 'reactstrap';
import { auth, db } from '../../firebase';

import Dashboard from './components/dashboard';
import BannerContent from './components/banner-content';
import ProjectInfoContent from './components/project-info-content';
import SocialContentSection from './components/social-content-section';
import EditProjectBanner from './components/edit-project-banner';

const LoadingView = styled.div`
  display: flex;
  height: 70vh;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProjectPage = ({ match, location }) => {
  const [ loadingState, setLoadingState ] = useState(false);
  const [ showDashboardState, setShowDashboardState ] = useState(false);
  const [ projectDataState, setProjectDataState ] = useState({});
  const [ editableState, setEditableState ] = useState(false);
  const [ pidState, setPidState ] = useState(null);

  useEffect(() => {
    const init = async () => {
      setLoadingState(true);

      const { shortname } = match.params;
      const projects = await db.getAllByFilter('projects')(
        db.where('shortname')('==')(shortname.trim()),
      );

      if (projects !== undefined && projects.length === 1) {
        const project = projects[0];
        setProjectDataState(project);
        setPidState(project.id);
        // a project is editable if the user either belongs to the team or the admin
        if (auth.isLoggedIn()) {
          const { uid: currentUserId } = auth.getUserInfo();
          if (currentUserId) {
            const editable = some(project.team, id => id === currentUserId)
              || some(project.admin, id => id === currentUserId)
              || project.owner === currentUserId;
            // set whether or not editable
            setEditableState(editable);
          }
        }
      }
      setLoadingState(false);
    };

    init();
  }, []);

  const toggleDashboard = toggle => () => setShowDashboardState(toggle);

  if (loadingState) {
    return <LoadingView>Loading ...</LoadingView>;
  }
  if (pidState && showDashboardState) {
    return <Dashboard pid={pidState} handleCloseDashboard={toggleDashboard(false)} />;
  }
  return (
    <section>
      {editableState ? <EditProjectBanner onEdit={toggleDashboard(true)} /> : <div />}
      <Row>
        <BannerContent name={projectDataState.name} images={projectDataState.images} />
        <ProjectInfoContent project={projectDataState} />
      </Row>
      <SocialContentSection
        isOwner={editableState}
        projectId={pidState}
        ourstory={projectDataState.about ? projectDataState.about : ''}
        selected={location.hash}
      />
    </section>
  );
};

export default withRouter(ProjectPage);
