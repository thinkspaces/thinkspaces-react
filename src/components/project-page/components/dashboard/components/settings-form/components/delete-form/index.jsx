// Libraries
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

// Components
import SaveButton from "components/shared/save-button";

// Hooks
import useProject from "hooks/use-project";

const Container = styled.section`
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

const DeleteForm = ({ history, pid }) => {
  const { deleteProject } = useProject();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = () => {
    setSuccess(false);
    setLoading(true);
    // attempt delete
    deleteProject(pid);
    // stop load and set success
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
    // navigate to root
    history.replace("/");
  };

  return (
    <Container>
      <h3>Delete project</h3>
      <div className="wrap">
        <span className="helpText">
          Careful! Clicking delete will <b>irreversibly</b> delete your project,
          all its data, and scrub clean any users that refer to it.
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
    </Container>
  );
};

export default withRouter(DeleteForm);
