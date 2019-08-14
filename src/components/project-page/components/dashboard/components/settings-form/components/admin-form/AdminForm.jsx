import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import AsyncSelect from 'react-select/lib/Async';

import { map, isString } from 'lodash';
import Option from '../../../option';
import MultiValueLabel from '../../../multi-value-label';

import { db } from '../../../../../../../../firebase';

const AdminForm = ({ className }) => {
  const promiseOptions = usernameInput =>
    new Promise((resolve) => {
      const filterUsers = async () => {
        const users = await db.getAllByFilter('users')(db.where('username')('>=')(usernameInput));
        return users;
      };

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
      <Field
        name="admin"
        render={({ field, form }) => (
          <div className="wrap">
            <AsyncSelect
              defaultOptions
              cacheOptions
              value={field.value}
              name="admin"
              components={{ Option, MultiValueLabel }}
              onChange={value =>
                form.setFieldValue('admin', map(value, user => (isString(user) ? user : user.id)))
              }
              isMulti
              getOptionValue={option => (isString(option) ? option : option.id)}
              loadOptions={promiseOptions}
            />
          </div>
        )}
      />
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
