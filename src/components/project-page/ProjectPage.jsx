import React, { useState, useEffect } from 'react';
import { SizeMe } from 'react-sizeme';
import some from 'lodash/some';
import { withRouter } from 'react-router-dom';

import { Row } from 'reactstrap';
import { db, auth } from '../../firebase';

import Dashboard from './components/dashboard';
import EditProjectButton from './components/edit-project-button';
import BannerContent from './components/banner-content';
import ProjectInfoContent from './components/project-info-content';
import SocialContentSection from './components/social-content-section';

const LoadingView = () => (
  <div
    style={{
      display: 'flex',
      height: '70vh',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    Loading ...
  </div>
);

const ProjectPage = (props) => {
  const [ loadingState, setLoadingState ] = useState(false);
  const [ showDashboardState, setShowDashboardState ] = useState(false);
  const [ projectDataState, setProjectDataState ] = useState({});
  const [ editableState, setEditableState ] = useState(false);
  const [ pidState, setPidState ] = useState(undefined);

  const handleMount = async () => {
    setLoadingState(true);

    const { shortname } = props.match.params;
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

  useEffect(() => {
    handleMount();
  }, []);

  const toggleDashboard = toggle => () => setShowDashboardState(toggle);
  const {
    location: { hash },
  } = props;

  if (loadingState) {
    return <LoadingView />;
  }
  if (pidState && showDashboardState) {
    return <Dashboard pid={pidState} handleCloseDashboard={toggleDashboard(false)} />;
  }
  return (
    <>
      <EditProjectButton isOwner={editableState} onEdit={toggleDashboard(true)} />
      <SizeMe>
        {({ size }) => (
          <Row>
            <BannerContent
              width={size.width}
              name={projectDataState.name}
              images={projectDataState.images}
            />
            <ProjectInfoContent project={projectDataState} />
          </Row>
        )}
      </SizeMe>
      <SocialContentSection
        isOwner={editableState}
        projectId={pidState}
        ourstory={projectDataState.about ? projectDataState.about : ''}
        selected={hash}
      />
    </>
  );
};

export default withRouter(ProjectPage);
