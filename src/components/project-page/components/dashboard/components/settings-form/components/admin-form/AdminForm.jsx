import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import AsyncSelect from 'react-select/lib/Async';
import Option from '../../../option';
import MultiValueLabel from '../../../multi-value-label';

import SaveButton from '../../../../../../../shared/save-button';
import { Project, Shared } from '../../../../../../../../firebase/models';

const AdminForm = ({ className, pid }) => {
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ adminState, setAdminState ] = useState([]);

  const modifyForReactSelect = arrayOfUsersData => arrayOfUsersData.map(user => ({ ...user,
    value: user.id,
    label: user.username,
    icon: user.profilepicture }));

  const handleSetup = async () => {
    setLoading(true);
    // fetch admin for project
    const admin = await Project.getAdmin(pid);
    // modify data for use with react select
    setAdminState(modifyForReactSelect(admin));
    setLoading(false);
  };

  const handleChange = (users) => {
    setAdminState(users);
  };

  const handleSave = async () => {
    // start loading
    setSuccess(false);
    setLoading(true);
    // delete all previous users from admin
    await Project.dropAdmin(pid);
    // save project
    await Promise.all(adminState.map(async user => Project.addAdminUser(pid, user.id)));
    // stop loading
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  useEffect(() => {
    handleSetup();
  }, []);

  const filterUsers = async (usernameInput) => {
    const query = Shared.constructQuery('users').where('username', '>=', usernameInput);
    const users = await Shared.getFromQuery(query);
    return modifyForReactSelect(users);
  };

  const promiseOptions = usernameInput => new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterUsers(usernameInput));
    }, 1000);
  });

  return (
    <section className={className}>
      <h3>Manage administrators</h3>
      <span className="helpText">
        Search for users by their username to add them as administrators to this project.
        Administrators can modify project settings and wield special permissions.
      </span>
      <div className="wrap">
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
      <SaveButton disabled={loading} loading={loading} success={success} onClick={handleSave} />
    </section>
  );
};

export default styled(AdminForm)`
  margin-bottom: 50px;

  .wrap {
    width: 80%;
  }

  @media (max-width: 768px) {
    .wrap {
      width: 100%;
    }
  }
`;
