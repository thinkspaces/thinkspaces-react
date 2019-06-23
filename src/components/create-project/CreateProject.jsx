import React, { useState } from 'react';

import { Project } from '../../firebase/models';
import { getUserInfo } from '../../firebase/auth';

import CreateButton from './components/create-button/CreateButton';
import NewProjectModal from './components/new-project-modal/NewProjectModal';
import { BannerContainer, StyledLink } from '../../design-language/design-language';

import useModal from '../../hooks/use-modal';

const NEW_PROJECT_MODAL_ID = 'NEW_PROJECT_MODAL_ID';

const CreateProject = () => {
  const { closeModal, openModal, isModalOpen } = useModal();
  const [ loading, setLoading ] = useState(false);

  const handleCreate = name => async () => {
    setLoading(true);
    // fetch current logged in user
    const { uid } = getUserInfo();
    if (!uid) {
      return;
    }
    // create the project with one field only for simplicity
    const pid = await Project.create({ name });
    Project.addAdminUser(pid, uid);
    Project.addTeamUser(pid, uid);
    // redirect
    window.location.replace(`/projects/${ pid }`);
  };

  return (
    <>
      <BannerContainer>
        <StyledLink onClick={openModal(NEW_PROJECT_MODAL_ID)}> Create a Project </StyledLink>
      </BannerContainer>
      <NewProjectModal
        open={isModalOpen(NEW_PROJECT_MODAL_ID)}
        onClose={closeModal}
        onCreate={handleCreate}
        loading={loading}
      />
    </>
  );
};

export default CreateProject;
