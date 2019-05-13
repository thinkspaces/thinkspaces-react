import React, { useState, useEffect } from 'react';
import { components } from 'react-select'
import AsyncSelect from 'react-select/lib/Async';
import SaveButton from '../../../../shared/save-button'
import { User, Project } from '../../../../../firebase/db';

import styles from './ProjectTeamForm.module.css';

const ProjectTeamForm = (props) => {
  const { pid } = props
  const project = new Project(pid);
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ teamState, setTeamState ] = useState([]);

  const modifyForReactSelect = (arrayOfUsersData) => {
    arrayOfUsersData.forEach((user) => {
      user.value = user.id
      user.label = user.username
      user.icon = user.profilepicture
    })
    return arrayOfUsersData
  }

  const handleSetup = async () => {
    setLoading(true);
    // fetch team for project
    const team = await project.readTeam()
    // modify data for use with react select
    setTeamState(modifyForReactSelect(team))
    setLoading(false);
  }

  const handleChange = (users) => {
    setTeamState(users)
  }

  const handleSave = async () => {
    // start loading
    setSuccess(false);
    setLoading(true);
    // delete all previous users from team
    await project.deleteTeam()
    // save project
    await Promise.all(
      teamState.map(async user => project.updateTeamUser(new User(undefined, user.ref))),
    )
    // stop loading
    setLoading(false);
    // show check mark
    setSuccess(true);
  };

  useEffect(() => {
    handleSetup();
  }, []);

  const filterUsers = async (usernameInput: string) => {
    const users = await User.read('username', '>=', usernameInput)
    return modifyForReactSelect(users)
  }

  const promiseOptions = usernameInput => new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterUsers(usernameInput));
    }, 1000);
  });

  const Option = (props) => {
    const { data } = props
    const { label, icon } = data
    return (
      <components.Option {...props}>
        <div className={styles.wrap}>
          <img src={icon || 'http://www.gravatar.com/avatar'} alt="user icon" className={styles.icon} />
          <span>{ label }</span>
        </div>

      </components.Option>
    )
  };

  const MultiValueLabel = (props) => {
    const { data } = props
    const { label, icon } = data
    return (
      <components.MultiValueLabel {...props}>
        <div className={styles.wrap}>
          <img src={icon || 'http://www.gravatar.com/avatar'} alt="user icon" className={styles.icon} />
          <span>{ label }</span>
        </div>

      </components.MultiValueLabel>
    )
  };

  return (
    <>
      <h2>Team</h2>
      <div className={styles.wrapper}>
        <p>Search for users by their username to add them as team members for this project.</p>
        {/* Async Select */}
        <AsyncSelect
          cacheOptions
          value={teamState}
          name="team"
          components={{ Option, MultiValueLabel }}
          onChange={handleChange}
          isMulti
          loadOptions={promiseOptions}
        />
        <SaveButton loading={loading} success={success} onClick={handleSave} />
      </div>
    </>
  );
}

export default ProjectTeamForm
