import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { some, get, isNil } from 'lodash';
import { withRouter } from 'react-router-dom';

import Dashboard from './components/dashboard';
import EditProjectBanner from './components/edit-project-banner';
import Info from './components/info';
import Need from './components/need';
import About from './components/about';
import Image from './components/image';
import Likes from './components/likes';
import ContactModal from '../shared/contact-modal';
import useProject from '../../hooks/use-project';
import useUser from '../../hooks/use-user';
import useModal from '../../hooks/use-modal';

const Container = styled.section`
  display: grid;
  grid-template-columns: 20% 1fr 20%;
  grid-template-rows: auto auto auto auto;
  grid-template-areas: 'banner banner banner' 'image info likes' '. need .' '. about .';
`;

const CONTACT_MODAL_ID = 'CONTACT_MODAL_ID';

const ProjectPage = ({ location }) => {
  const [ showDashboard, setShowDashboard ] = useState(false);
  const [ editable, setEditable ] = useState(false);

  const pid = get(location, 'state.id', null);
  const { project, tags } = useProject(pid);
  const { user } = useUser();
  const { closeModal, openModal, isModalOpen } = useModal();

  useEffect(() => {
    if (project && user) {
      const _editable = some(project.admin, id => id === user.id) || project.owner === user.id;
      setEditable(_editable);
    }
  }, [ project, user ]);

  if (isNil(project)) {
    return <div>Loading...</div>;
  }
  if (showDashboard) {
    return <Dashboard pid={pid} onClose={() => setShowDashboard(false)} />;
  }
  return (
    <Container>
      {editable && <EditProjectBanner onEdit={() => setShowDashboard(true)} />}
      <Image images={project.images} />
      <Info name={project.name} description={project.description} tags={tags} />
      <Likes pid={pid} />
      <Need roles={project.roles} onContact={openModal(CONTACT_MODAL_ID)} />
      <About about={project.about} images={project.images} links={project.links} />
      <ContactModal
        open={isModalOpen(CONTACT_MODAL_ID)}
        toggle={closeModal}
        buttonLabel={`Contact ${ project.name }`}
        modalBody={<a href={`mailto:${ project.contact }`}>{project.contact}</a>}
      />
    </Container>
  );
};

export default withRouter(ProjectPage);

/* <SocialContentSection
        isOwner={editable}
        projectId={pid}
        ourstory={project.about ? project.about : ''}
        selected={location.hash}
      /> */
