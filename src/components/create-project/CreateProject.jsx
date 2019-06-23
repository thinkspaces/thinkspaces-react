import React, { useState } from 'react';

import { Project, db } from '../../firebase';
import { getUserInfo } from '../../firebase/auth';

import NewProjectModal from './components/new-project-modal/NewProjectModal';
import Button from '../shared/button';

import useModal from '../../hooks/use-modal';

const NEW_PROJECT_MODAL_ID = 'NEW_PROJECT_MODAL_ID';

const CreateProject = () => {
  const { closeModal, openModal, isModalOpen } = useModal();
  const [ loading, setLoading ] = useState(false);

  const handleCreate = name => async () => {
    setLoading(true);
    // fetch current logged in user
    const user = getUserInfo();
    if (!user) {
      setLoading(false);
      return;
    }
    // create the project with one field only for simplicity
    const pid = await Project.create({ name });
    Project.updateFieldArrayWithId(db.add)('admin')(pid)(user.uid);
    Project.updateFieldArrayWithId(db.add)('team')(pid)(user.uid);
    // redirect
    window.location.replace(`/projects/${ pid }`);
  };

  return (
    <>
      <Button variant="link" onClick={openModal(NEW_PROJECT_MODAL_ID)}>
        Submit a Project
      </Button>
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
