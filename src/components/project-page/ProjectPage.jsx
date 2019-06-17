import React, { useState, useEffect } from 'react';
import { SizeMe } from 'react-sizeme';
import some from 'lodash/some';

import { Row } from 'reactstrap';
import { auth } from '../../firebase';
import { Project } from '../../firebase/models';

import Dashboard from './components/dashboard';
import EditProjectButton from './components/edit-project-button';
import BannerContent from './components/banner-content';
import ProjectInfoContent from './components/project-info-content';

const LoadingView = () => (
  <div
    style={{ display: 'flex',
      height: '70vh',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' }}
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

  /**
   * on mount:
   * fetches the project from the database
   * checks if the user can edit it
   * updates state accordingly
   */
  const handleMount = async () => {
    setLoadingState(true);
    // get shortname from router params
    // eslint-disable-next-line react/destructuring-assignment
    const { shortname } = props.match.params;
    const pid = await Project.getIdFromShortname(shortname.trim());
    if (pid !== undefined) {
      // read project from database
      const project = await Project.get(pid);
      // set both the project and the pid
      setProjectDataState(project);
      setPidState(pid);
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

  // call handleMount() once on mount
  useEffect(() => {
    handleMount();
  }, []);

  const handleCloseDashboard = async () => {
    window.location.reload();
  };

  const handleShowDashboard = async () => {
    setShowDashboardState(true);
  };

  /**
   * programmatic display of content
   */
  const render = () => {
    if (loadingState) {
      return <LoadingView />;
    }
    if (pidState && showDashboardState) {
      return <Dashboard pid={pidState} handleCloseDashboard={handleCloseDashboard} />;
    }
    return (
      <>
        <EditProjectButton isOwner={editableState} onEdit={handleShowDashboard} />
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
      </>
    );
  };

  return <>{render()}</>;
};

export default ProjectPage;
