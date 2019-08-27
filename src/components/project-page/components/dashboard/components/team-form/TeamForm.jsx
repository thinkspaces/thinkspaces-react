import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import AsyncSelect from 'react-select/lib/Async';

import { map, isString } from 'lodash';
import Option from '../option';
import MultiValueLabel from '../multi-value-label';

import { db } from '../../../../../../firebase';

const SelectForm = ({ field, form, promiseOptions }) => (
  <div className="wrap">
    <AsyncSelect
      defaultOptions
      cacheOptions
      value={field.value}
      name="team"
      components={{ Option, MultiValueLabel }}
      onChange={value =>
        form.setFieldValue('team', map(value, user => (isString(user) ? user : user.id)))
      }
      isMulti
      getOptionValue={option => (isString(option) ? option : option.id)}
      loadOptions={promiseOptions}
    />
  </div>
);

const TeamForm = ({ className }) => {
  const promiseOptions = usernameInput =>
    new Promise((resolve) => {
      const filterUsers = async () => {
        const users = await db.getAllByFilter('users')(db.where('full_name')('>=')(usernameInput));
        return users;
      };

      setTimeout(() => {
        resolve(filterUsers(usernameInput));
      }, 1000);
    });

  return (
    <section className={className}>
      <h2>Manage team</h2>
      <p>Search for users by their username to add them as team members for this project.</p>
      <Field name="team" component={SelectForm} promiseOptions={promiseOptions} />
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
