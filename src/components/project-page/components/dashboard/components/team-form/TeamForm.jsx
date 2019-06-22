import React from 'react';
import styled from 'styled-components';
import AsyncSelect from 'react-select/lib/Async';

import Option from '../option';
import MultiValueLabel from '../multi-value-label';
import SaveButton from '../../../../../shared/save-button';

import { db } from '../../../../../../firebase';
import useProjectTeam from '../../../../../../hooks/use-project-team';

const TeamForm = ({ className, pid }) => {
  const modifyForReactSelect = arrayOfUsersData =>
    arrayOfUsersData.map(user => ({
      value: user.id,
      label: user.username,
      icon: user.profilepicture,
    }));

  const promiseOptions = usernameInput =>
    new Promise((resolve) => {
      const filterUsers = async () => {
        const users = await db.getAllByFilter('users')(db.where('username')('>=')(usernameInput));
        return modifyForReactSelect(users);
      };

      setTimeout(() => {
        resolve(filterUsers(usernameInput));
      }, 1000);
    });

  const { team, success, loading, handleSave, handleChange } = useProjectTeam(pid);

  return (
    <section className={className}>
      <h2>Manage team</h2>
      <p>Search for users by their username to add them as team members for this project.</p>
      <div className="wrap">
        <AsyncSelect
          cacheOptions
          value={team}
          name="team"
          components={{ Option, MultiValueLabel }}
          onChange={handleChange}
          isMulti
          loadOptions={promiseOptions}
        />
      </div>
      <SaveButton loading={loading} disabled={loading} success={success} onClick={handleSave} />
    </section>
  );
};

export default styled(TeamForm)`
  @media (max-width: 768px) {
    .wrap {
      width: 100%;
    }
  }

  .wrap {
    width: 80%;
  }
`;
