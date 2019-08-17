import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { auth } from '../../firebase';

import NewProjectModal from './components/new-project-modal';
import Button from '../shared/button';
import useModal from '../../hooks/use-modal';
import useProject from '../../hooks/use-project';

const NEW_PROJECT_MODAL_ID = 'NEW_PROJECT_MODAL_ID';

const CreateProject = ({ history }) => {
  const { createProject } = useProject();
  const { closeModal, openModal, isModalOpen } = useModal();
  const [ loading, setLoading ] = useState(false);

  const handleCreate = name => async () => {
    setLoading(true);
    // fetch current logged in user
    const user = auth.getUserInfo();
    if (!user) {
      setLoading(false);
      return;
    }

    const payload = await createProject({ name, team: [ user.uid ], admin: [ user.uid ] });
    if (payload) {
      history.replace(`/projects/${ payload.value.result }`, { id: payload.value.result });
    }
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

export default withRouter(CreateProject);
