import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';
import some from 'lodash/some';

import { Row } from 'reactstrap';
import { auth } from '../../firebase';
import { Project } from '../../firebase/models';

import ProjectDashboard from './components/project-dashboard';
import SocialContentSection from './components/social-content-section';
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

class ProjectPage extends Component {
  state = { isEditing: false, project: null, editable: false, pid: null };

  componentDidMount = async () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { shortname } = this.props.match.params;
    const pid = await Project.getIdFromShortname(shortname);
    if (pid !== undefined) {
      const { uid: currentUserId } = auth.getUserInfo();
      if (currentUserId) {
        const project = await Project.get(pid);
        this.setState({ project, pid });
        const editable = some(project.team, id => id === currentUserId)
          || some(project.admin, id => id === currentUserId);
        this.setState({ editable });
      }
    }
  };

  saveChanges = async () => {
    // ReactGA.event({ category: 'Edit Profile', action: 'Saved', label: uid });
    // this.setState({ isEditing: false });
    // temporary, until more streamlined project editing implemented
    window.location.reload();
  };

  onCancel = () => {
    // const { uid } = this.state;
    // ReactGA.event({ category: 'Edit Profile', action: 'Canceled', label: uid });
    this.setState({ isEditing: false });
  };

  onEditChange = ({ target: { value, id } }) => {
    this.setState(prevState => ({ project: { ...prevState.project, [id]: value } }));
  };

  render() {
    const { isEditing, project, editable, pid } = this.state;
    const { location: { hash } } = this.props;
    if (isEditing) {
      return <ProjectDashboard pid={pid} saveChanges={this.saveChanges} />;
    }
    if (!isEditing && project) {
      return (
        <div>
          <EditProjectButton isOwner={editable} onEdit={() => this.setState({ isEditing: true })} />
          <SizeMe>
            {({ size }) => (
              <Row>
                <BannerContent width={size.width} title={project.title} images={project.images} />
                <ProjectInfoContent
                  title={project.title}
                  links={project.links}
                  contact={project.contact}
                  about={project.card_des}
                  need={project.need}
                  team={project.team}
                  projectId={pid}
                />
              </Row>
            )}
          </SizeMe>
          <SocialContentSection
            isOwner={editable}
            projectId={pid}
            ourstory={project.about}
            selected={hash}
          />
        </div>
      );
    }
    return <LoadingView />;
  }
}

export default ProjectPage;
