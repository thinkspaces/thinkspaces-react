import React, { useState } from 'react';
import styled from 'styled-components';

import Filter from '../shared/filter';
import ProjectList from './components/project-list';
import useProjects from '../../hooks/use-projects';

const Header = styled.h2`
  margin-bottom: 0px;
`;

const filterTypes = [ 'project-category', 'release-status', 'organization' ];

const ExploreProjects = () => {
  const [ appliedTags, setAppliedTags ] = useState([]);
  const projects = useProjects();

  const handleFilter = (tag) => {
    const index = appliedTags.findIndex(_tag => _tag === tag.id);
    if (index === -1) {
      setAppliedTags([ ...appliedTags, tag.id ]);
    } else {
      setAppliedTags(prevState => [ ...prevState.slice(0, index), ...prevState.slice(index + 1) ]);
    }
  };

  return (
    <div>
      <Header>All Projects</Header>
      <Filter types={filterTypes} onFilter={handleFilter} />
      <ProjectList projects={projects} appliedTags={appliedTags} />
    </div>
  );
};

export default ExploreProjects;
