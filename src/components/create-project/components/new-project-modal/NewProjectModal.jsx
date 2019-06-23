import React, { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SaveButton from '../../../shared/save-button';

const NewProjectModal = ({ className, open, onClose, onCreate, loading }) => {
  const [ name, updateName ] = useState('');
  const handleUpdateName = (event) => {
    updateName(event.target.value);
  };

  return (
    <ReactModal
      className={classNames(className, 'fade-in-animation')}
      overlayClassName="reactModalOverlay"
      isOpen={open}
    >
      <div className="card">
        <div className="header">
          <h2>Create new project</h2>
          <button type="button" className="defBtn neutral" onClick={onClose}>
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
        <h5>Woohoo! You{"'"}re on your way.</h5>
        <span className="helpText">What do you want your project to be called?</span>
        <input
          type="text"
          className="text-input input"
          value={name}
          onChange={handleUpdateName}
          placeholder="e.g. Thinkspaces"
        />
        <SaveButton
          disabled={name.trim().length === 0}
          type="button"
          loading={loading}
          text="Get started"
          className="defBtn"
          onClick={onCreate(name)}
        />
      </div>
    </ReactModal>
  );
};

export default styled(NewProjectModal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .card {
    box-shadow: var(--shadow-lift);
    padding: 25px;
    width: 100%;
    min-width: 400px;
    background-color: white;
    border-radius: 10px;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .input {
    width: 80% !important;
    /* margin: 0 auto; */
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .reactModalOverlay {
    all: unset;
    z-index: 1;
  }
`;
