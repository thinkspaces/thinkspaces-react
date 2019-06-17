import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { Project, Shared } from '../../../../../../../../firebase/models';
import SaveButton from '../../../../../../../shared/save-button';

import Tooltip from './components/Tooltip';
import StatusIndicator from './components/StatusIndicator';
import useLoader from '../../../../../../../../hooks/use-loader';

const ShortnameForm = ({ className, pid }) => {
  const [ init, setInit ] = useState('');
  const [ input, setInput ] = useState('');
  const inputRef = useRef(null);
  const [ valid, setValid ] = useState(true);

  const [ available, setAvailable ] = useState(true);
  const [ searching, setSearching ] = useState(false);

  const saveHandler = async (event) => {
    // prevent default
    event.preventDefault();
    // only update shortname if it doesn't exist
    const query = Shared.constructQuery('projects').where('shortname', '==', input);
    const data = await Shared.getFromQuery(query);
    if (data.length === 0) {
      await Project.update(pid, { shortname: input });
      // reset "init"
      setInit(input);
    }
    // redirect to new page
    window.location.replace(`/projects/${ input }`);
  };

  /**
   * validate HTML5 form input
   */
  const validate = () => {
    // check form is valid via ref
    const form = inputRef.current;
    if (form) {
      if (form.checkValidity()) {
        setValid(true);
      } else {
        setValid(false);
      }
    }
  };

  /**
   * retrieve already saved shortname on mount if one exists
   */
  const handleSetup = async () => {
    // start search
    setSearching(true);
    // read shortname for current project
    const project = await Project.get(pid);
    // set state accordingly if defined
    setInput(project.shortname === undefined ? '' : project.shortname);
    setInit(project.shortname === undefined ? '' : project.shortname);
    // check for validity of existing shortname
    // this will modify the form and button accordingly
    validate();
    // stop search
    setSearching(false);
  };

  /**
   *
   * @param {Promise} promise : the promise from the input
   */
  const resolveProjects = async (promise) => {
    // set unavailable while search continues
    // also start search
    setAvailable(false);
    setSearching(true);
    // resolve data from input
    const data = await promise;
    if (data.length > 0) {
      // if a project was found
      if (data[0].shortname === init) {
        // if the project is the same as current
        setAvailable(true);
      } else {
        // if the project is some other
        setAvailable(false);
      }
    } else {
      // if no project was found
      setAvailable(true);
    }

    setSearching(false);
  };

  /**
   * fired whenever typing into input
   */
  const handleInput = async (event) => {
    // set the current input
    const sanitized = event.target.value.trim();
    setInput(sanitized);
    // send the input off to resolve and search for existing projects
    const query = Shared.constructQuery('projects').where('shortname', '==', sanitized);
    const promise = Shared.getFromQuery(query);
    resolveProjects(promise);
    // validate the input and set state accordingly
    validate();
  };

  const { handleSave, loading, success } = useLoader(handleSetup, saveHandler);
  return (
    <section className={className}>
      <h3>Set shortname</h3>
      <form>
        <div className="wrap">
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
          <StatusIndicator available={available} searching={searching} />
        </div>
        <Tooltip />
        <SaveButton
          type="submit"
          loading={loading}
          success={success}
          disabled={searching || !available || !valid}
          onClick={handleSave}
        />
      </form>
    </section>
  );
};

export default styled(ShortnameForm)`
  margin-bottom: 50px;

  .wrap {
    display: flex;
    align-items: center;
    width: 80%;
  }

  .wrap > * {
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    .wrap {
      width: 100%;
    }
  }
`;
