import React, { useState } from 'react'
import ReactModal from 'react-modal';
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User, Project } from '../../firebase/db'
import { getUserInfo } from '../../firebase/auth'
import SaveButton from '../shared/save-button'

import styles from './CreateProject.module.css'

const CreateProject = (props) => {
  const [ modalState, setModalState ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ nameState, setNameState ] = useState('')

  const handleShowModal = () => { setModalState(true) }
  const handleCloseModal = () => { setModalState(false) }

  const handleNameInput = (event) => { setNameState(event.target.value) }

  const handleCreate = async () => {
    setLoading(true)
    // fetch current logged in user
    const { uid } = getUserInfo()
    if (!uid) { return }
    // create a user instance for the logged in user
    const user = new User(uid)
    // instantiate an empty project
    const project = new Project()
    // create the project with two fields only for simplicity: the name and shortname
    const shortname = project.id()
    await project.create({ name: nameState, shortname })
    // add logged in user as an admin and a team member
    await project.updateAdminUser(user)
    await project.updateTeamUser(user)
    // redirect
    window.location.replace(`/projects/${ shortname }`)
  }

  return (
    <>
      <button
        type="button"
        className="defBtn"
        onClick={handleShowModal}
      >
        Create Project
      </button>
      <ReactModal
        className={classNames(styles.reactModal, 'fade-in-animation')}
        overlayClassName={styles.reactModalOverlay}
        isOpen={modalState}
      >
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Create new project</h2>
            <button
              type="button"
              className={classNames('defBtn neutral', styles.close)}
              onClick={handleCloseModal}
            >
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
          <h5>Woohoo! You{"'"}re on your way.</h5>
          <span className="helpText">What do you want your project to be called?</span>
          <input
            type="text"
            className={classNames('text-input', styles.input)}
            value={nameState}
            onChange={handleNameInput}
            placeholder="e.g. Thinkspaces"
          />
          <SaveButton
            type="button"
            loading={loading}
            text="Get started"
            className={classNames('defBtn', styles.button)}
            onClick={handleCreate}
          />
        </div>
      </ReactModal>
    </>
  )
}

export default CreateProject
