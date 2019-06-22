import React, { useState } from 'react';

import { Project, db } from '../../firebase';
import { getUserInfo } from '../../firebase/auth';

import CreateButton from './components/create-button/CreateButton';
import NewProjectModal from './components/new-project-modal/NewProjectModal';

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
    Project.updateFieldArrayWithId(db.add)('admin')(pid)(uid);
    Project.updateFieldArrayWithId(db.add)('team')(pid)(uid);
    // redirect
    window.location.replace(`/projects/${ pid }`);
  };

  return (
    <>
      <CreateButton onClick={openModal(NEW_PROJECT_MODAL_ID)}>Create Project</CreateButton>
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
