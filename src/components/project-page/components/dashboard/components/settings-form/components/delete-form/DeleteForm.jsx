import React, { useState } from 'react';
import styled from 'styled-components';
import { Project } from '../../../../../../../../firebase';
import SaveButton from '../../../../../../../shared/save-button';

const DeleteForm = ({ className, pid }) => {
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  /**
   * save the shortname to the project's document in the database
   */
  const handleDelete = async () => {
    // reset success and start load
    setSuccess(false);
    setLoading(true);
    // attempt delete
    await Project.destroy(pid);
    // stop load and set success
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
    // navigate to root
    window.location.replace('/');
  };

  return (
    <section className={className}>
      <h3>Delete project</h3>
      <div className="wrap">
        <span className="helpText">
          Careful! Clicking delete will <b>irreversibly</b> delete your project, all its data, and
          scrub clean any users that refer to it.
        </span>
        <SaveButton
          onClick={handleDelete}
          className="defBtn danger"
          text="Delete"
          loading={loading}
          success={success}
          disabled={loading}
        />
      </div>
    </section>
  );
};

export default styled(DeleteForm)`
  margin-bottom: 50px;

  .wrap {
    width: 60%;
  }

  @media (max-width: 768px) {
    .wrap {
      width: 100%;
    }
  }
`;
