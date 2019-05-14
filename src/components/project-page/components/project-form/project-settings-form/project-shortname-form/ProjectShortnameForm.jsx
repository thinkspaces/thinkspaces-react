import React, { useState, useEffect, useRef } from 'react'
import idx from 'idx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Project } from '../../../../../../firebase/db';
import SaveButton from '../../../../../shared/save-button'

import styles from './ProjectShortnameForm.module.css'

const ProjectShortnameForm = (props) => {
  const { pid } = props
  const project = new Project(pid)

  // state used to manage the input
  const [ init, setInit ] = useState('')
  const [ input, setInput ] = useState('')
  const inputRef = useRef(null)
  const [ valid, setValid ] = useState(true)

  // state used while searching for projects
  const [ available, setAvailable ] = useState(true)
  const [ searching, setSearching ] = useState(false)

  // state used for save button
  const [ loading, setLoading ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  /**
   * save the shortname to the project's document in the database
   */
  const handleSave = async (event) => {
    // prevent default
    event.preventDefault()

    // reset success and start load
    setSuccess(false)
    setLoading(true)

    // check again if shortname is taken
    // only update shortname if it doesn't exist
    const data = await Project.read('shortname', '==', input)
    if (data.length === 0) {
      await project.update({ shortname: input })
      // reset "init"
      setInit(input)
    }

    // stop load and set success
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 1000)

    // redirect to new page
    window.location.replace(`/projects/${ input }`)
  }

  /**
   * validate HTML5 form input
   */
  const validate = () => {
    // check form is valid via ref
    const form = idx(inputRef, obj => obj.current)
    if (form) {
      if (form.checkValidity()) {
        setValid(true)
      } else {
        setValid(false)
      }
    }
  }

  /**
   * retrieve already saved shortname on mount if one exists
   */
  const handleSetup = async () => {
    // start search
    setSearching(true)

    // read shortname for current project
    const projectData = await project.read()
    const shortname = idx(projectData, obj => obj.shortname)

    // set state accordingly if defined
    setInput(shortname === undefined ? '' : shortname)
    setInit(shortname === undefined ? '' : shortname)

    // check for validity of existing shortname
    // this will modify the form and button accordingly
    validate()

    // stop search
    setSearching(false)
  }

  // setup on mount
  useEffect(() => {
    handleSetup();
  }, []);

  /**
   *
   * @param {Promise} promise : the promise from the input
   */
  const resolveProjects = async (promise) => {
    // set unavailable while search continues
    // also start search
    setAvailable(false)
    setSearching(true)

    // resolve data from input
    const data = await promise
    if (data.length > 0) {
      // if a project was found
      if (data[0].shortname === init) {
        // if the project is the same as current
        setAvailable(true)
      } else {
        // if the project is some other
        setAvailable(false)
      }
    } else {
      // if no project was found
      setAvailable(true)
    }

    setSearching(false)
  }

  /**
   * fired whenever typing into input
   */
  const handleInput = async (event) => {
    // set the current input
    const sanitized = (event.target.value).trim()
    setInput(sanitized)
    // send the input off to resolve and search for existing projects
    const promise = Project.read('shortname', '==', sanitized)
    resolveProjects(promise)
    // validate the input and set state accordingly
    validate()
  }

  const renderStatus = () => {
    if (searching) {
      return (<FontAwesomeIcon icon="circle-notch" spin />)
    }
    if (available) {
      return (<FontAwesomeIcon icon="check-circle" />)
    }
    return (<FontAwesomeIcon icon="times-circle" />)
  }

  return (
    <>
      <h3>Set shortname</h3>
      <form>
        <div className={styles.wrap}>
          <input
            ref={inputRef}
            type="text"
            required
            pattern="^[A-Za-z0-9_]{5,20}$"
            onChange={handleInput}
            value={input}
            className="text-input"
            placeholder="Unique shortname e.g. thinkspaces"
          />
          {/* statuses e.g. loading, availability */}
          { renderStatus() }
        </div>
        {/* help text */}
        <span className="helpText">
          Shortname must be unique.<br />
          It must be between 5-20 characters in length.<br />
          Valid characters include: aA-zZ, 0-9 and underscores.
        </span>
        {/* save button */}
        <SaveButton
          type="submit"
          loading={loading}
          success={success}
          disabled={searching || !available || !valid}
          onClick={handleSave}
        />
      </form>
    </>
  )
}

export default ProjectShortnameForm
