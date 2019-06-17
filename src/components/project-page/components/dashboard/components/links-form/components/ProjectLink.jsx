import React from 'react';
import styled from 'styled-components';

import RadioField from './RadioField';
import LinkField from './LinkField';
import Options from './Options';

const ProjectLink = ({ index, primary, onRemove, onAdd, handleRadio, className }) => (
  <div key={index} className={className}>
    <LinkField title="Name" type="name" index={index} placeholder="e.g. Website" />
    <LinkField title="URL" type="url" index={index} placeholder="e.g. https://thinkspaces.org" />
    <RadioField index={index} primary={primary} onChange={handleRadio} />
    <Options onRemove={onRemove} onAdd={onAdd} />
  </div>
);

export default styled(ProjectLink)`
  width: 100%;
  display: flex;
  align-items: baseline;
`;
