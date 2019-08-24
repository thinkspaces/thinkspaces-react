import React from 'react';
import styled from 'styled-components';

import RoleField from './RoleField';
import Options from './Options';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;

  .fields {
    width: 100%;
  }

  .input {
    width: 60%;
  }
`;

const ProjectLink = ({ index, onRemove, onAdd }) => (
  <Container key={index}>
    <div className="fields">
      <RoleField
        className="input"
        title="Name"
        type="name"
        index={index}
        placeholder="e.g. Developer"
      />
      <RoleField
        fieldType="textarea"
        title="Description"
        type="description"
        index={index}
        placeholder="e.g. Great mobile development skills!"
      />
    </div>
    <Options onRemove={onRemove} onAdd={onAdd} />
  </Container>
);

export default ProjectLink;
