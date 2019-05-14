import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';
import queryString from 'query-string';

import { Row } from 'reactstrap';
import { db, auth } from '../../firebase';
import { Project } from '../../firebase/db'

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
  state = { isEditing: false, project: null, isOwner: false, pid: null };

  componentDidMount = async () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { shortname } = this.props.match.params
    const pid = await Project.idFromShortname(shortname)
    if (pid !== undefined) {
      const project = await (new Project(pid)).read()
      const isOwner = auth.isCurrentAuthUser(project.owner);
      this.setState({ project, isOwner, pid });
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
    const { isEditing, project, isOwner, pid } = this.state;
    const { location: { hash } } = this.props;
    if (isEditing) {
      return (
        <ProjectDashboard
          pid={pid}
          saveChanges={this.saveChanges}
        />
      );
    }
    if (!isEditing && project) {
      return (
        <div>
          <EditProjectButton isOwner={isOwner} onEdit={() => this.setState({ isEditing: true })} />
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
            isOwner={isOwner}
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
