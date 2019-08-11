import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';

import { differenceWith } from 'lodash';

import Card from '../../../shared/card';

const renderProjects = projects =>
  projects.map((p, i) => (
    <Col sm key={i}>
      <Card
        id={p.id}
        name={p.name}
        shortname={p.shortname}
        description={p.description}
        image={p.images && p.images[0]}
        tags={p.tags}
      />
    </Col>
  ));

const ProjectList = ({ projects, appliedTags }) => {
  const [ filteredProjects, setFilteredProjects ] = useState([]);

  useEffect(() => {
    const filtered = projects.filter(
      project => differenceWith(appliedTags, project.tags, (a, b) => a === b.id).length === 0,
    );
    setFilteredProjects(filtered);
  }, [ appliedTags ]);

  return (
    <Row>
      {appliedTags.length > 0 ? renderProjects(filteredProjects) : renderProjects(projects)}
    </Row>
  );
};

export default ProjectList;
