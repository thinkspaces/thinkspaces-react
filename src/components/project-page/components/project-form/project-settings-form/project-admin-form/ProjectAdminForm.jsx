import React, { useState, useEffect } from 'react';
import { components } from 'react-select'
import AsyncSelect from 'react-select/lib/Async';
import SaveButton from '../../../../../shared/save-button'
import { User, Project } from '../../../../../../firebase/db';

import styles from './ProjectAdminForm.module.css';

const ProjectAdminForm = (props) => {
  const { pid } = props
  const project = new Project(pid);
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ adminState, setAdminState ] = useState([]);

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
    // fetch admin for project
    const admin = await project.readAdmin()
    // modify data for use with react select
    setAdminState(modifyForReactSelect(admin))
    setLoading(false);
  }

  const handleChange = (users) => {
    setAdminState(users)
  }

  const handleSave = async () => {
    // start loading
    setSuccess(false);
    setLoading(true);
    // delete all previous users from admin
    await project.deleteAdmin()
    // save project
    await Promise.all(
      adminState.map(async user => project.updateAdminUser(new User(undefined, user.ref))),
    )
    // stop loading
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  };

  useEffect(() => {
    handleSetup();
  }, []);

  const filterUsers = async (usernameInput) => {
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
        <div className={styles.optionWrap}>
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
      <h3>Manage administrators</h3>
      <span className="helpText">
            Search for users by their username to add them as administrators to this project.
            Administrators can modify project settings and wield special permissions.
      </span>
      {/* Async Select */}
      <div className={styles.wrap}>
        <AsyncSelect
          cacheOptions
          value={adminState}
          name="admin"
          components={{ Option, MultiValueLabel }}
          onChange={handleChange}
          isMulti
          loadOptions={promiseOptions}
        />
      </div>
      <SaveButton loading={loading} success={success} onClick={handleSave} />
    </>
  );
}

export default ProjectAdminForm
