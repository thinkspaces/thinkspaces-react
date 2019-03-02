import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';
import queryString from 'query-string';

import { Col, Row, Button } from 'reactstrap';
import { FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon } from 'react-share';
import BaseContainer from '../../components/navigation/BaseContainer/BaseContainer';

import ContactModal from '../../components/ui/modals/ContactModal';

import { db, auth } from '../../firebase';
import withAuthorization from '../../components/Authentication/withAuthorization';

import Carousel from '../../components/ui/Carousel/Carousel';
import ViewProfileButton from '../../components/ui/buttons/ViewProfileButton';
import EditProject from '../../components/ui/project/sections/EditProject';

const headerStyle = { margin: '50px 0px', textAlign: 'center' };

const BannerTitle = ({ title }) => (
  <div style={headerStyle}>
    <h1>{title}</h1>
  </div>
);

const BannerImageCarousel = ({ images }) => (
  <div style={headerStyle}>
    {images[0].length > 0 ? (
      <Carousel items={images} />
    ) : (
      <img
        src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
        alt="default cover"
      />
    )}
  </div>
);

const BannerSection = ({ width, title, images }) => (
  <Col style={{ flexBasis: width < 720 ? 'auto' : 0 }}>
    <BannerTitle title={title} />
    <BannerImageCarousel images={images} />
  </Col>
);

const InfoSection = ({ title, links, contact, about, need, team, projectId }) => (
  <Col>
    <div style={{ marginTop: 150 }} />
    {title && <SocialSection title={title} id={projectId} />}
    {contact && <ModalSection title={title} contact={contact} projectId={projectId} />}
    {team && <TeamSection team={team} />}
    {links.length > 0 && <ContactSection links={links} />}
    {about && <AboutSection about={about} />}
    {need && <NeedSection need={need} />}
  </Col>
);

const ModalSection = ({ title, contact, projectId }) => (
  <InfoView>
    <ContactModal
      buttonLabel={`Contact ${ title }`}
      modalBody={<a href={`mailto:${ contact }`}>{contact}</a>}
      projectId={projectId}
    />
  </InfoView>
);

const SocialSection = ({ title, id }) => (
  <InfoView>
    <div className="d-flex">
      <FacebookShareButton
        style={{ marginRight: 10 }}
        url={`https://thinkspaces.org/projects/${ title }?id=${ id }`}
        className="button is-outlined is-rounded facebook"
      >
        <span className="icon">
          <FacebookIcon size={32} round />
        </span>
      </FacebookShareButton>
      <TwitterShareButton
        style={{ marginRight: 10 }}
        url={`https://thinkspaces.org/projects/${ title }?id=${ id }`}
        className="button is-outlined is-rounded linkedin"
      >
        <span className="icon">
          <TwitterIcon size={32} round />
        </span>
      </TwitterShareButton>
      <LinkedinShareButton
        url={`https://thinkspaces.org/projects/${ title }?id=${ id }`}
        className="button is-outlined is-rounded linkedin"
      >
        <span className="icon">
          <LinkedinIcon size={32} round />
        </span>
      </LinkedinShareButton>
    </div>
  </InfoView>
);

const TeamSection = ({ team }) => (
  <InfoView title="Team">
    <div style={{ display: 'inline-grid' }}>
      {team.map((member, i) => (
        <ViewProfileButton key={i} uid={member.uid} text={member.name} />
      ))}
    </div>
  </InfoView>
);

const ContactSection = ({ links }) => (
  <InfoView title="Links">
    <div>
      <a href={links}>{links}</a>
    </div>
  </InfoView>
);

const AboutSection = ({ about }) => (
  <InfoView title="About us">
    <p>{about}</p>
  </InfoView>
);

const NeedSection = ({ need }) => (
  <InfoView title="Who we need">
    <div>{need}</div>
  </InfoView>
);

const InfoView = ({ title, children }) => (
  <Row style={{ marginBottom: 20 }}>
    <Col md={3}>
      <b>{title}</b>
    </Col>
    <Col>{children}</Col>
  </Row>
);

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

const EditProjectButton = ({ isOwner, onEdit }) => (
  <div style={{ marginTop: 20 }}>
    {isOwner && (
      <Button color="danger" onClick={onEdit}>
        Edit Project
      </Button>
    )}
  </div>
);

class Page extends Component {
  state = { isEditing: false, project: null, isOwner: false, pid: null };

  componentDidMount = async () => {
    const { location } = this.props;
    const values = queryString.parse(location.search);
    const project = await db.getProjectByID(values.id);
    const isOwner = auth.isCurrentAuthUser(project.owner);
    this.setState({ project, isOwner, pid: values.id });
  };

  saveChanges = async () => {
    const { project, pid } = this.state;

    // ReactGA.event({ category: 'Edit Profile', action: 'Saved', label: uid });
    await db.saveProjectChanges(project, pid);
    this.setState({ isEditing: false });
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
    if (isEditing) {
      return (
        <BaseContainer>
          <EditProject
            project={project}
            saveChanges={this.saveChanges}
            onEditChange={this.onEditChange}
            onCancel={this.onCancel}
          />
        </BaseContainer>
      );
    }
    if (!isEditing && project) {
      return (
        <BaseContainer>
          <SizeMe>
            {({ size }) => (
              <Row>
                <BannerSection width={size.width} title={project.title} images={project.images} />
                <InfoSection
                  title={project.title}
                  links={project.links}
                  contact={project.contact}
                  about={project.about}
                  need={project.need}
                  team={project.team}
                  projectId={pid}
                />
              </Row>
            )}
          </SizeMe>
          <EditProjectButton isOwner={isOwner} onEdit={() => this.setState({ isEditing: true })} />
        </BaseContainer>
      );
    }
    return <LoadingView />;
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(Page);
