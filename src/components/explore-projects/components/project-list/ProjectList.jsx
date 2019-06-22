import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';

import { difference } from 'lodash';
import { db } from '../../../../firebase';

import Card from '../../../shared/card';

const renderProjects = allTags => projects =>
  projects.map((p, i) => (
    <Col sm key={i}>
      <Card
        name={p.name}
        shortname={p.shortname}
        description={p.description}
        image={p.images && p.images[0]}
        tags={p.tags}
        allTags={allTags}
      />
    </Col>
  ));

const ProjectList = ({ projects, appliedTags }) => {
  const [ allTags, setAllTags ] = useState([]);
  const [ filteredProjects, setFilteredProjects ] = useState([]);

  useEffect(() => {
    const init = async () => {
      const _tags = await db.getAll('tags');
      setAllTags(_tags);
    };
    init();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      project => project.tags && difference(appliedTags, project.tags).length === 0,
    );
    setFilteredProjects(filtered);
  }, [ appliedTags ]);

  return (
    <Row>
      {appliedTags.length > 0
        ? renderProjects(allTags)(filteredProjects)
        : renderProjects(allTags)(projects)}
    </Row>
  );
};

export default ProjectList;
